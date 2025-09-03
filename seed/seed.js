// seed.js
import mongoose from "mongoose";
import fs from "fs";
import Phish from "./models/PhishUrlSchema.js";

const MONGO_URI = import.meta.env.MONGO_URI;
const BATCH_SIZE = 5000;

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log("MongoDB connected");

    // Load JSON file
    const rawData = fs.readFileSync("phishtank.json");
    const data = JSON.parse(rawData);

    console.log(`Loaded ${data.length} records`);

    // Insert in batches
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE).map(doc => ({
        ...doc,
        submission_time: new Date(doc.submission_time),
        verification_time: doc.verification_time ? new Date(doc.verification_time) : null,
        details: doc.details.map(d => ({
          ...d,
          detail_time: d.detail_time ? new Date(d.detail_time) : null
        }))
      }));

      await Phish.insertMany(batch, { ordered: false });
      console.log(`Inserted batch ${i / BATCH_SIZE + 1}`);
    }

    console.log("Seeding completed!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedData();
