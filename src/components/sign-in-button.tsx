"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

const SignInButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/all-vaults" });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleSignIn} disabled={loading}>
      {loading ? "Signing In..." : "Sign In"}
      {loading && <span className="ml-2 spinner"></span>}
    </Button>
  );
};

export default SignInButton;
