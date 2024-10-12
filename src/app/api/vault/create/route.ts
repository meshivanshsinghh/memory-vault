import { createVault } from "@/actions/createVault";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const result = await createVault(data);
    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 401 });
    }
    return NextResponse.json(
      { message: result.message, vaultId: result.vaultId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating vault:", error);
  }
}
