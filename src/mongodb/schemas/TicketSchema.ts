import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClient extends Document {
  email: string;
  companyName: string;
  serviceType: string;
  domain?: string;
  saasProductName?: string;
  password: string;
  products?: string;
}
interface Client {
  serviceType: string;
}

const clientSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['webApp', 'saasProduct'],
  },
  domain: {
    type: String,
    default: null,
    required: function (this: Client) {
      return this.serviceType === 'webApp';
    },
  },
  saasProductName: {
    type: String,
    default: null,
    required: function (this: Client) {
      return this.serviceType === 'saasProduct';
    },
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Client: Model<IClient> = mongoose.models.Client || mongoose.model<IClient>('Client', clientSchema);

// Ticket interface and schema
export interface ITicket extends Document {
  name: string;
  email: string;
  contactNumber: string;
  helpTopic: string;
  product?: string;
  // domainName?: string;
  subject: string;
  message: string;
  status: "Open" | "Closed";
}

const ticketSchema: Schema = new Schema({
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
  // domainName: {
  //   type: String,
  //   default: null,
  //   required: [true, "Domain name is required."],
  //   trim: true,
  // },
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
}, { timestamps: true });

export const Tickets: Model<ITicket> = mongoose.models.Ticket || mongoose.model<ITicket>('Tickets', ticketSchema);


