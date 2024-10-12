import { NextRequest, NextResponse } from "next/server";
import { addFilesToVault } from "@/actions/addFiles";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const vaultId = req.nextUrl.searchParams.get("vaultId");

    if (!vaultId) {
      console.log("Vault ID is missing");
      return NextResponse.json({ success: false, message: "Vault ID missing" });
    }

    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      console.log("No files selected");
      return NextResponse.json({
        success: false,
        message: "No files selected for upload",
      });
    }

    console.log("Uploading files to vault:", vaultId);

    const response = await addFilesToVault(vaultId, formData);

    if (!response.success) {
      console.log("Upload failed:", response.message);
      return NextResponse.json({ success: false, message: response.message });
    }

    console.log("Files uploaded successfully");
    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully",
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({
      success: false,
      message: "Error uploading files",
    });
  }
}
