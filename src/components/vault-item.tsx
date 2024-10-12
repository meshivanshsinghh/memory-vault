import formatVaultTime from "@/utils/format-vault-time";
import Link from "next/link";
import { ClockIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function VaultItem({
  data,
}: {
  data: {
    id: string;
    name: string;
    description: string;
    ownerEmail: string;
    thumbnailUrl?: string | null;
    files: { name: string; type: string; cid: string; id: string }[];
    unlockDate: Date;
    createdAt?: Date;
  };
}) {
  const unlockDateLocal = new Date(data.unlockDate);
  const isUnlocked = Date.now() > unlockDateLocal.getTime();
  const createdAt = data.createdAt ? new Date(data.createdAt) : null;
  const content = (
    <div className="flex font-sans border rounded-lg overflow-hidden h-55">
      {" "}
      {/* Fixed height */}
      <div className="flex-none w-48 h-48 relative">
        {/* Thumbnail section */}
        {data.thumbnailUrl ? (
          <img
            src={data.thumbnailUrl}
            alt={`${data.name} Thumbnail`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
      {/* Vault info section */}
      <div className="flex-auto p-4">
        {" "}
        {/* Reduced padding for better fit */}
        <div className="flex flex-wrap items-baseline">
          <h1 className="flex-auto text-lg font-bold text-slate-900">
            {data.name}
          </h1>
          <div className="w-full text-sm text-slate-500">
            {createdAt
              ? `Created ${createdAt.toLocaleDateString()}`
              : "Creation date unavailable"}
          </div>
        </div>
        {/* Ensure description wraps to the next line */}
        <p className="text-sm text-slate-500 mt-2 truncate">
          {data.description}
        </p>
        <div className="flex items-baseline mt-2 pb-4">
          <div className="w-full text-xl font-medium text-slate-700">
            {`${data.files.length} ${
              data.files.length === 1 ? "file" : "files"
            }`}
          </div>
        </div>
        {/* Buttons section */}
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
          {isUnlocked ? (
            <></>
          ) : (
            <div className="text-red-600 flex items-center w-full md:w-auto">
              <ClockIcon className="w-6 h-6 inline mr-2" />
              Unlocks in {formatVaultTime(unlockDateLocal)}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return <Link href={`/edit-vault/${data.id}`}>{content}</Link>;
}
