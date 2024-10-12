import { getVault } from "@/lib/vault-handler";

export default async function VaultPage({
  params,
}: {
  params: { vaultId: string };
}) {
  const vault = await getVault(params.vaultId);

  if (!vault) {
    return <h1>Vault not found</h1>;
  }

  return (
    <div>
      <h1>Vault: {vault.title}</h1>
    </div>
  );
}
