 // Make sure you have 'node-fetch' installed
require("dotenv").config(); // If you want to store sensitive data like client_id and client_secret in .env

const getAccessToken = async () => {
  const url = "https://atlas.mappls.com/oauth2/token";
  const body = new URLSearchParams({
    client_id: process.env.CLIENT_ID,  // Store your client_id in .env
    client_secret: process.env.CLIENT_SECRET,  // Store your client_secret in .env
    grant_type: "client_credentials",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),  // Form URL-encoded body
    });

    if (!response.ok) {
      console.error("Failed to get access token", response.statusText);
      return;
    }

    const data = await response.json();
    console.log("Access Token:", data.access_token); // Save this token for subsequent requests
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

getAccessToken();
