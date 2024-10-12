"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const SignOutButton = () => {
  const handleSignOut = async () => {
    console.log("Sign-out button clicked");
    try {
      await signOut({callbackUrl:"/"});
      console.log("Sign-out process triggered");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Logout
    </Button>
  );
};

export default SignOutButton;
