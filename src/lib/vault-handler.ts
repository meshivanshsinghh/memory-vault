import Vault, { IVault, IFile } from "@/models/vault";
import { getFiles } from "@/utils/pinata-handler";
import mongoose from "mongoose"; // Import mongoose for ObjectId

// Function to get vault details
export const getVault = async (vaultId: string) => {
  try {
    const vault = await Vault.findOne({ _id: vaultId });
    if (!vault) {
      return null;
    }
    return vault;
  } catch (error) {
    console.error(`Error fetching vault with id ${vaultId}:`, error);
    return null;
  }
};

// Function to delete a vault
export const deleteVault = async (vaultId: string, adminId: string) => {
  try {
    const vault = await Vault.findOne({ _id: vaultId, admin: adminId });
    if (!vault) {
      return null;
    }

    await Vault.deleteOne({ _id: vaultId });
    return true;
  } catch (error) {
    console.error(`Error deleting vault with id ${vaultId}:`, error);
    return null;
  }
};
// Define a lean version of the vault interface that doesn't include Mongoose methods
interface LeanVault {
  _id: string; // Since we'll convert ObjectId to string
  title: string;
  description: string;
  thumbnail: string;
  unlockDate: Date;
  admin: string; // Converted to string
  invitedUsers: string[]; // Converted to array of strings
  isPublic: boolean;
  createdAt: Date | undefined;
  files: Array<{
    name: string;
    type: string;
    cid: string;
    url: string;
    id?: string;
  }>;
}
// Function to get all vaults with thumbnails for a specific admin
export async function getAllVaultsWithThumbnails(
  adminId: string
): Promise<Array<LeanVault & { thumbnailUrl?: string | null }>> {
  // Fetch all vaults for the specified admin using lean() for plain JS objects
  const vaults = await Vault.find({ admin: adminId }).lean();

  // Ensure we have vaults before proceeding
  if (!vaults || vaults.length === 0) return [];

  // Get the thumbnail CIDs for all vaults
  const thumbnailCids = vaults.map((vault) => vault.thumbnail).filter(Boolean);
  const thumbnailUrls = await getFiles(thumbnailCids);

  // Map the vault data to the expected format
  return vaults.map((vault) => ({
    _id: (vault._id as mongoose.Types.ObjectId).toString(), // Convert _id to string
    title: vault.title,
    description: vault.description,
    thumbnail: vault.thumbnail,
    unlockDate: vault.unlockDate,
    admin: (vault.admin as mongoose.Types.ObjectId).toString(), // Convert admin to string
    invitedUsers: (vault.invitedUsers as mongoose.Types.ObjectId[]).map(
      (user) => user.toString()
    ), // Convert invitedUsers ObjectIds to strings
    isPublic: vault.isPublic,
    createdAt: vault.createdAt ? new Date(vault.createdAt) : undefined, // Ensure createdAt is a Date or undefined
    files: vault.files.map((file: IFile) => ({
      name: file.name,
      type: file.type,
      cid: file.cid,
      url: file.url,
      id: file.cid, // Use cid as id
    })),
    thumbnailUrl: vault.thumbnail
      ? thumbnailUrls[vault.thumbnail] || null
      : null, // Add the thumbnail URL if it exists
  }));
}
