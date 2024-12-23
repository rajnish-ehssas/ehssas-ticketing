import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the IClient interface
export interface IServices extends Document {
  email: string;
  companyName: string;
  services: string;
}

// Define the schema rules for the client
export const ServicesRule = {
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Invalid email format.",
    },
  },
  companyName: {
    type: String,
    required: [true, "Company name is required."],
    minlength: [2, "Company name must be at least 2 characters long."],
    maxlength: [100, "Company name cannot exceed 100 characters."],
    trim: true,
  },
  services: {
    type: String,
    required: [true, "Services are required."],
    minlength: [2, "Services must be at least 2 characters long."],
    maxlength: [200, "Services cannot exceed 200 characters."],
    trim: true,
  },
};

// Create the client schema
const ServicesSchema = new Schema<IServices>(ServicesRule as Record<string, unknown>, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Create the Client model
export const Services: Model<IServices> =
  mongoose.models.Client || mongoose.model<IServices>('Client', ServicesSchema);
