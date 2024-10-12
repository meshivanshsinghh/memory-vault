"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputLabel } from "./ui/input-label";
import { Button } from "@/components/ui/button";
import { DatetimePicker } from "./datetime-picker";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/submit-button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function UploadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.target as HTMLFormElement);

    const response = await fetch("/api/vault/create", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      router.push(`/vault/${result.vaultId}`);
    } else {
      setErrorMessage(result.error || "Failed to create vault.");
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">+ New Vault</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Memory Vault</DialogTitle>
          <DialogDescription>
            Provide the details to create a new vault. You can invite others to
            contribute later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <InputLabel
            title="Title"
            placeholder="Enter a title"
            id="title"
            name="title"
            required
          />
          <InputLabel
            title="Description"
            placeholder="Describe the vault"
            id="description"
            name="description"
            required
          />
          <InputLabel
            title="Thumbnail"
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            required
          />

          <div className="mb-4">
            <Label>Unlock Date</Label>
            <DatetimePicker />
          </div>

          {errorMessage && <p className="text-red-600">{errorMessage}</p>}

          <SubmitButton text="Create Vault" loadingText="Creating..." />
        </form>
      </DialogContent>
    </Dialog>
  );
}
