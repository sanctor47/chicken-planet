import { Schema, model } from 'mongoose';

const adminSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String },
    OTP: { type: String },
    active: { type: Boolean },
  },
  {
    timestamps: true
  }
);

export default model('Admin', adminSchema);
