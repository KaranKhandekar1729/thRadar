// models/Phish.js
import mongoose from "mongoose";

const DetailSchema = new mongoose.Schema({
  ip_address: { type: String },
  cidr_block: { type: String },
  announcing_network: { type: String },
  rir: { type: String },
  country: { type: String },
  detail_time: { type: Date },
}, { _id: false });

const PhishSchema = new mongoose.Schema({
  phish_id: { type: Number, required: true, unique: true, index: true },
  url: { type: String, required: true, index: true },
  phish_detail_url: { type: String },
  submission_time: { type: Date },
  verified: { type: String, enum: ["yes", "no"] },
  verification_time: { type: Date },
  online: { type: String, enum: ["yes", "no", "unknown"] },
  details: [DetailSchema],
  target: { type: String },
}, { timestamps: true });

export default mongoose.model("Phish", PhishSchema);
