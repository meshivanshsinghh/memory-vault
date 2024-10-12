import { redirect } from "next/navigation";
import { auth } from "@/auth";
import UploadForm from "@/components/upload-form";
import { getAllVaultsWithThumbnails } from "@/lib/vault-handler";
import VaultItem from "@/components/vault-item";
import { NoVaultsFound } from "@/components/no-vaults";

export default async function Dashboard() {
  const user = await auth();
  if (!user?.user) {
    redirect("/");
  }

  const vaults = await getAllVaultsWithThumbnails(user.user.id!);

  return (
    <div className="p-8">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold mb-4">My Memory Vaults</h1>
        <UploadForm />
      </div>

      {vaults.length === 0 ? (
        <NoVaultsFound />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vaults.map((vault) => (
            <li key={vault._id} className="col-span-1 h-[210px]">
              <VaultItem
                data={{
                  id: vault._id.toString(),
                  name: vault.title,
                  description: vault.description,
                  ownerEmail: vault.admin.toString(),
                  thumbnailUrl: vault.thumbnailUrl || null,
                  files: vault.files.map((file) => ({
                    ...file,
                    id: file.cid,
                  })),
                  unlockDate: new Date(vault.unlockDate),
                  createdAt: vault.createdAt
                    ? new Date(vault.createdAt)
                    : undefined,
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
