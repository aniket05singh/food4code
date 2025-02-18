const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

const PORT = 5000; // Choose a port for the backend

app.get("/get-location", async (req, res) => {
  const { address } = req.query;
  const apiKey = process.env.MAPPLS_API_KEY; // Load API Key from .env
  console.log(apiKey);

  if (!apiKey) {
    return res.status(500).json({ error: "API Key is missing" });
  }

  try {
    console.log(req, req.query);
    // Use await to get the response data directly
    const response = await fetch(
      `https://apis.mappls.com/advancedmaps/v1/${apiKey}/geo_code?address=${encodeURIComponent(address)}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    // Check if response is ok
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error fetching location data" });
    }

    // Parse the JSON response
    const data = await response.json();
    console.log("Latitude:", data.copResults[0].latitude);
    console.log("Longitude:", data.copResults[0].longitude);

    // Send the data back to the client
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
