import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

const IP2LOC_KEY = process.env.IP2LOCATION_API_KEY;

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
})

app.listen(5001, () => console.log("Running on port 5001"))
