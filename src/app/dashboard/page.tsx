import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const user = await auth();
    if(!user?.user){
        redirect("/")
    }
    return (
        <><h1>dashboard</h1></>
    )
}