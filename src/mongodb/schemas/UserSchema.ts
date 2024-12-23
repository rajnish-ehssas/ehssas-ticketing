import mongoose, { Schema, Document, Model } from 'mongoose';
// Define the IUser interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    minlength: [2, "Name must be at least 2 characters long."],
    maxlength: [50, "Name cannot exceed 50 characters."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Invalid email format.",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [8, "Password must be at least 8 characters long."],
    validate: {
      validator: (value: string) =>
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[!@#$%^&*]/.test(value),
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    },
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required."],
    validate: {
      validator: (value: string) => /^\+?[1-9]\d{1,14}$/.test(value),
      message: "Contact number must follow the E.164 format (e.g., +1234567890).",
    },
  },
}, { timestamps: true });
// Create the User model
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);




