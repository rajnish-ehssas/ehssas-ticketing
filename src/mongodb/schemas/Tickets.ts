import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage {
  message: string;
  sentBy: 'ADMIN' | 'CLIENT';
  createdAt?: Date;
}

export interface ITicket extends Document {
  clientReferenceID: string;
  name: string;
  contactEmail: string;
  contactNumber: string;
  helpTopic: 'Technical Support' | 'Billing' | 'Other';
  chooseYourProduct: 'webApp' | 'saasProduct';
  domain?: string;
  saasProductName?: string;
  subject: string;
  messages: IMessage[];
  status: 'Open' | 'Closed';
  createdAt?: Date;
  updatedAt?: Date;
}

const ticketSchema: Schema = new Schema(
  {
    clientReferenceID: {
      type: String,
      ref: 'Client',
      required: [true, 'Client Reference ID is required.'],
    },
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required.'],
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please enter a valid email address.',
      },
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required.'],
      validate: {
        validator: function (v: string) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: 'Please enter a valid contact number.',
      },
    },
    helpTopic: {
      type: String,
      enum: ['Technical Support', 'Billing', 'Other'],
      required: [true, 'Help topic is required.'],
    },
    chooseYourProduct: {
      type: String,
      enum: ['webApp', 'saasProduct'],
      required: [true, 'Choose your product is required.'],
    },
    domain: {
      type: String,
      required: function (this: ITicket) {
        return this.chooseYourProduct === 'webApp';
      },
      validate: {
        validator: function (this: ITicket, v: string) {
          return this.chooseYourProduct === 'webApp' ? v.length > 0 : true;
        },
        message: 'Domain is required for webApp.',
      },
    },
    saasProductName: {
      type: String,
      required: function (this: ITicket) {
        return this.chooseYourProduct === 'saasProduct';
      },
      validate: {
        validator: function (this: ITicket, v: string) {
          return this.chooseYourProduct === 'saasProduct' ? v.length > 0 : true;
        },
        message: 'SaaS product name is required for saasProduct.',
      },
    },
    subject: {
      type: String,
      required: [true, 'Subject is required.'],
      trim: true,
    },
    messages: [
      {
        message: {
          type: String,
          required: [true, 'Message text is required.'],
        },
        sentBy: {
          type: String,
          enum: ['ADMIN', 'CLIENT'],
          default: 'CLIENT',
          required: [true, 'Message sender is required.'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['Open', 'Closed'],
      default: 'Open',
    },
  },
  { timestamps: true }
);

export const Ticket: Model<ITicket> =
  mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', ticketSchema);
