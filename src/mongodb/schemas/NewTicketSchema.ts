import mongoose, { Schema, Document } from "mongoose";

// Define a sub-schema for Messages
const messageSchema = new Schema(
  {
    message: { type: String },
    sentBy: { type: String, enum: ["CLIENT", "ADMIN"] },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// Define a sub-schema for a Ticket
const ticketItemSchema = new Schema(
  {
    RaisedBy: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    helpTopic: { type: String },
    product: { type: String },
    subject: { type: String },
    messages: { type: [messageSchema], default: [] },
    status: { type: String, enum: ["Open", "Closed"], default: "Open" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// Define the main Ticket Schema
export interface ITicket extends Document {
  clientReferenceID: string; // Required client ID reference
  Tickets: {
    openTickets?: typeof ticketItemSchema[];
    closedTickets?: typeof ticketItemSchema[];
  };
}


const ticketSchema = new Schema({
  clientReferenceID: {
    type: String,
    ref: "Client",
    required: true,
    unique: true, // Ensure only one ticket document per client
  },
  email: { type: String },
  companyName: { type: String },
  serviceType: { type: String },
  domain: { type: String },
  saasProductName: { type: String },
  Tickets: {
    openTickets: { type: [ticketItemSchema], default: [] },
    closedTickets: { type: [ticketItemSchema], default: [] },
  },
});

export const Ticket = mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);
