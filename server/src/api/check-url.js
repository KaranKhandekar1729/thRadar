import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import Phish from "../models/PhishUrlSchema.js";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.get("/check-url", async(req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Missing url" });

    try {
        // query
        const result = await Phish.findOne({url})

        if (!result) {
            return res.json({ message: "Not found in phishing DB" });
        }

        return res.json({
            online: result.online,
            target: result.target,
            verified: result.verified,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
})

app.listen(4000, () => console.log("Running..."))