import { auth } from "@/auth";
import Vault from "@/models/vault";
import { uploadFiles as uploadThumbnail } from "@/utils/pinata-handler";

export async function createVault(formData: FormData) {
  const user = await auth();
  if (!user?.user) {
    return { success: false, message: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as File;
  const unlockDate = new Date(formData.get("unlockDate") as string);

  if (!title || !description || !thumbnail || !unlockDate) {
    return { success: false, message: "Missing required fields." };
  }

  if (unlockDate.getTime() < Date.now()) {
    return { success: false, message: "Unlock date must be in the future." };
  }

  try {
    const [uploadedThumbnail] = await uploadThumbnail([thumbnail]);

    if (!uploadedThumbnail || !uploadedThumbnail.cid) {
      throw new Error("Thumbnail upload failed.");
    }

    const newVault = await Vault.create({
      title,
      description,
      thumbnail: uploadedThumbnail.cid,
      unlockDate,
      admin: user.user.id,
      invitedUsers: [],
      files: [],
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Vault created successfully",
      vaultId: newVault._id,
    };
  } catch (error) {
    console.error("Error creating vault:", error);
    return { success: false, message: "Failed to create vault." };
  }
}
