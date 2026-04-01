import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // works in ES module

const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
}));

// Get all bikes
app.get("/bikes", async (req, res) => {
  try {
    const response = await fetch("https://www.cc.puv.fi/~hmh/fed/fedApi/bikes/");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching bikes");
  }
});

app.get("/bike", async (req, res) => {
  try {
    const id = req.query.id;
    const response = await fetch(`https://www.cc.puv.fi/~hmh/fed/fedApi/bikes?id=${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching bike");
  }
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));