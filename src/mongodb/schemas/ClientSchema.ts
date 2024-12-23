
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IClient extends Document {
  email: string;
  companyName: string;
  serviceType: string;
  domain: string;
  saasProductName: string;
  password: string;
  products?: string;
  roles: string[];
}
interface Client {
  serviceType: string;
}
const clientSchema: Schema = new Schema({
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
    required: true,
  },

  serviceType: {
    type: String,
    required: true,
    enum: ['webApp', 'saasProduct'],
  },
  domain: {
    type: String,
   
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
  roles: {
    type: [String],
    default: ['CLIENT'],
    validate: {
      validator: function (roles: string[]) {
        return roles.every((role) =>
          ['ADMIN', 'CLIENT'].includes(role)
        );
      },
      message: 'Invalid role provided.',
    },
  },
});

clientSchema.pre<IClient>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      return next(error as Error); // Pass the error to the next middleware
    }
  }
  next();
});
export const Client = mongoose.models.Client || mongoose.model<IClient>('Client', clientSchema);

