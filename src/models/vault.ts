import mongoose, { Schema, Document } from "mongoose";

export interface IFile {
  name: string;
  type: string;
  cid: string; // Pinata CID
  url: string; // URL for accessing the file
}

export interface IVault extends Document {
  title: string;
  description: string;
  thumbnail: string; // CID for the thumbnail image
  unlockDate: Date;
  admin: mongoose.Schema.Types.ObjectId; // Admin user (vault creator)
  invitedUsers: mongoose.Schema.Types.ObjectId[]; // Array of user IDs
  files: IFile[]; // Array of files uploaded to the vault
  isPublic: boolean; // True when the vault is unlocked
  createdAt: Date; // Timestamp when the vault was created
}

const vaultSchema: Schema<IVault> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true, // CID for the thumbnail image from Pinata
  },
  unlockDate: {
    type: Date,
    required: true, // Date when the vault becomes public
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Vault creator (admin)
  },
  invitedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Invited users who can upload files before unlock
    },
  ],
  files: [
    {
      name: {
        type: String,
        required: true, // Name of the file
      },
      type: {
        type: String,
        required: true, // File type (image, video, etc.)
      },
      cid: {
        type: String,
        required: true, // Pinata CID (IPFS identifier)
      },
      url: {
        type: String, // Pinata gateway URL for accessing the file
      },
    },
  ],
  isPublic: {
    type: Boolean,
    default: false, // Initially false, becomes true when the vault unlocks
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the createdAt date
  },
});

export default mongoose.models.Vault ||
  mongoose.model<IVault>("Vault", vaultSchema);
