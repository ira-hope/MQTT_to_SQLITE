const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // For resolving file paths
const app = express();

// Serve HTML file directly
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // Adjust path if necessary
});

// API to Get Data for Graphs
app.get("/data", (req, res) => {
    db.all("SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 20", (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

// Connect to SQLite
const db = new sqlite3.Database("weather_data.db");

// Start Server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
