import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import Phish from "./models/PhishUrlSchema.js";
import { super_strong } from "password-pwnd";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

const MONGO_URI = process.env.MONGO_URI
const ABUSE_API_KEY = process.env.CHECK_IP_KEY;
const IP2LOC_KEY = process.env.IP2LOCATION_API_KEY;

mongoose.connect(MONGO_URI)

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

app.post('/check-password', async (req, res) => {
    try {
        const { password } = req.body

        const strength = await super_strong(password)

        return res.json({ result: strength })
    } catch (error) {
        console.error("error: ", error)
    }
})

app.get("/ipcheck", async (req, res) => {
    const { ip } = req.query;
    if (!ip) return res.status(400).json({ error: "IP address is required" });

    try {
        // AbuseIPDB IP lookup
        const ipResponse = await fetch(
            `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90&verbose`,
            {
                headers: {
                    Key: ABUSE_API_KEY,
                    Accept: "application/json",
                },
            }
        );
        const ipJson = await ipResponse.json();
        const ipData = ipJson.data || {};
        // console.log(ipData.reports)

        res.json({
            ipData
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to fetch IP data" });
    }
});

app.get("/ip2loc", async (req, res) => {
    const { ip } = req.query;
    if (!ip) return res.status(400).json({ error: "IP address is required" });
    try {
        const geoResponse = await fetch(
            `https://api.ip2location.io/?key=${IP2LOC_KEY}&ip=${ip}&format=json`
        );
        const geoData = await geoResponse.json();
        res.json({ geoData });

    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch Geolocation data" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));