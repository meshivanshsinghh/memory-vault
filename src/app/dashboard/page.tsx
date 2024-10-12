import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await auth();
  if (!user?.user) {
    redirect("/");
  }
  return (
    <div className="p-8">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold mb-4">Your Vaults</h1>
        
      </div>
    </div>
  );
}
