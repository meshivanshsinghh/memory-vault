import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  googleId: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
