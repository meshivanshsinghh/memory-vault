import { auth } from "@/auth";
import { getVault } from "@/lib/vault-handler";
import { IFile } from "@/models/vault";
import formatVaultTime from "@/utils/format-vault-time";
import { getFiles } from "@/utils/pinata-handler";
import { ClockIcon } from "lucide-react";
import { redirect } from "next/navigation";
import VaultFileUpload from "@/components/files/vault-file-upload";

export default async function EditVaultPage({
  params,
}: {
  params: { vaultId: string };
}) {
  const user = await auth();
  if (!user?.user) {
    redirect("/");
  }

  const vault = await getVault(params.vaultId);

  if (!vault || vault.admin.toString() !== user.user.id) {
    redirect("/all-vaults");
  }

  const unlockDateLocal = new Date(vault.unlockDate);
  const isUnlocked = Date.now() > unlockDateLocal.getTime();
  const fileUrls = !isUnlocked
    ? {}
    : await getFiles(vault.files.map((file: { cid: string }) => file.cid));

  return (
    <div className="w-full h-full">
      <div className="pt-4 pl-4 pr-4 w-full flex justify-between">
        <div className="p-8 pt-4">
          <VaultFileUpload vaultId={vault._id} />
        </div>
        <div className="p-8 pt-4">
          {isUnlocked ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {vault.files.map((file: IFile) => (
                <div key={file.cid}>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src={fileUrls[file.cid]}
                    alt={file.name}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <ClockIcon className="w-6 h-6 inline" /> Unlocks in{" "}
              {formatVaultTime(unlockDateLocal)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
