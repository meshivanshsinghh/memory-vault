import formatVaultTime from "@/utils/format-vault-time";
import Link from "next/link";
import { ClockIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

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

  const inner = (
    <Card className="h-full">
      <CardHeader>
        {data.thumbnailUrl ? (
          <img
            src={data.thumbnailUrl}
            alt={`${data.name} Thumbnail`}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-md mb-4" />
        )}
        <CardTitle className="text-xl">{data.name}</CardTitle>
        <CardDescription className="text-base">
          {data.description}
        </CardDescription>
        <span className="text-sm text-gray-600">
          {createdAt
            ? `Created ${createdAt.toLocaleDateString()}`
            : "Creation date unavailable"}
        </span>
        <span className="text-sm text-gray-600">{`${data.files.length} ${
          data.files.length === 1 ? "file" : "files"
        }`}</span>
      </CardHeader>

      <CardContent>
        {isUnlocked ? (
          <Button variant="outline">
            <Link href={`/vault/${data.id}`}>Open</Link>
          </Button>
        ) : (
          <div>
            <p className="text-red-600">
              <ClockIcon className="w-6 h-6 inline" /> Unlocks in{" "}
              {formatVaultTime(unlockDateLocal)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!isUnlocked) {
    return <Link href={`/vault/${data.id}`}>{inner}</Link>;
  }
  return inner;
}
