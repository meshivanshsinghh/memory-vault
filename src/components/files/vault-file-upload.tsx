export default function VaultFileUploadPage({ vaultId }: { vaultId: string }) {
  return (
    <div className="w-full h-full">
      <h1 className="text-xl font-semibold mb-4">Upload Files</h1>
      <form
        action={`/api/vault/upload-files?vaultId=${vaultId}`}
        method="POST"
        encType="multipart/form-data"
        className="space-y-4"
      >
        <input type="file" name="files" multiple className="block w-full" />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Upload Files
        </button>
      </form>
    </div>
  );
}
