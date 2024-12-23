import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for the session document
export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const sessionSchema = new Schema<ISession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Client', 
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` before saving
sessionSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create an index to automatically delete expired sessions
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create and export the model
const Session: Model<ISession> = mongoose.model<ISession>('Session', sessionSchema);

export default Session;
