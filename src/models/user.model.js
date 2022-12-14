import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String, unique: true, required: true },
    password: { type: String },
    OTP: { type: String },
    domain: { type: String },
    active: { type: Boolean, default: false},
    completedProfile: { type: Boolean, default: false },
    refreshToken: { type: String },
    blocked: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
