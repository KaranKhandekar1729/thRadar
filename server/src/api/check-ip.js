import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

const ABUSE_API_KEY = process.env.CHECK_IP_KEY;

app.get("/ipcheck", async (req, res) => {
    const { ip } = req.query;
    if (!ip) return res.status(400).json({ error: "IP address is required" });

    try {
        // 1. AbuseIPDB IP lookup
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
