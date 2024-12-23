import mongoose, { Document, Schema } from 'mongoose';

export interface PasswordChangeRequestDocument extends Document {
    userId: mongoose.Types.ObjectId;
    tempPassword: string;
    createdAt: Date;
    expiresAt: Date;
}

const passwordChangeRequestSchema = new Schema<PasswordChangeRequestDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    tempPassword: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
});

export const PasswordChangeRequest = mongoose.models.PasswordChangeRequest || mongoose.model<PasswordChangeRequestDocument>(
    'PasswordChangeRequest',
    passwordChangeRequestSchema
);

// // Create the Client model
// export const Services: Model<IServices> =
//   mongoose.models.Client || mongoose.model<IServices>('Client', ServicesSchema);