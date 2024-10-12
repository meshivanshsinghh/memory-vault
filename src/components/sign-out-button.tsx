"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleSignOut}>
      <LogOut className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default SignOutButton;
