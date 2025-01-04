import mongoose, { Schema, Document, Model } from 'mongoose';

// Ticket interface and schema
export interface ITicket extends Document {
  clientReferenceID: string; // Required client ID reference
  name: string;
  email: string;
  contactNumber: string;
  helpTopic: string;
  product?: string;
  subject: string;
  message: string;
  status: "Open" | "Closed";
  domainName?: string;
}

const ticketSchema: Schema = new Schema({
  clientReferenceID: {
    type: String,
    ref: "Client",
    required: true,
    unique: true, // Ensure only one ticket document per client
  },
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
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Invalid email format.",
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
  helpTopic: {
    type: String,
    required: [true, "Help topic is required."],
    trim: true,
  },
  product: {
    type: String,
    required: [true, "Product is required."],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, "Subject is required."],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required."],
    trim: true,
  },
  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open",
    required: true,
  },
  domainName: {
    type: String,
    default: null,
    required: [true, "Domain name is required."],
    trim: true,
  },
}, { timestamps: true });

export const Tickets: Model<ITicket> = mongoose.models.Ticket || mongoose.model<ITicket>('Tickets', ticketSchema);


