import { auth } from "@/auth";
import Vault from "@/models/vault";
import { uploadFiles } from "@/utils/pinata-handler";

export async function addFilesToVault(vaultId: string, formData: FormData) {
  const user = await auth();
  if (!user?.user) {
    return { success: false, message: "Unauthorized" };
  }

  const files = formData.getAll("files") as File[];

  if (!files || files.length === 0) {
    return { success: false, message: "No files selected." };
  }

  try {
    const vault = await Vault.findOne({ _id: vaultId, admin: user.user.id });
    if (!vault) {
      return { success: false, message: "Vault not found or unauthorized." };
    }
    const uploadedFiles = await uploadFiles(files);
    vault.files.push(
      ...uploadedFiles.map((file) => ({
        name: file.name,
        type: file.type,
        cid: file.cid,
      }))
    );
    await vault.save();
    return { success: true, message: "Files uploaded successfully." };
  } catch (error) {
    console.error("Error uploading files to vault:", error);
    return { success: false, message: "File upload failed." };
  }
}
