const mqtt = require("mqtt");
const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite Database (Create if it doesn't exist)
const db = new sqlite3.Database("weather_data.db", (err) => {
    if (err) console.error("Database Error:", err);
    else console.log("Connected to SQLite");
});

// Create Table if Not Exists
db.run(`
    CREATE TABLE IF NOT EXISTS sensor_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        temperature REAL,
        humidity REAL
    )
`);

// Connect to MQTT Broker
const client = mqtt.connect("ws://157.173.101.159:9001");

client.on("connect", () => {
    console.log("Connected to MQTT Broker");
    client.subscribe("/work_group_01/room_temp/temperature");
    client.subscribe("/work_group_01/room_temp/humidity");
});

let latestData = { temperature: null, humidity: null };

// When a message is received from MQTT
client.on("message", (topic, message) => {
    const value = parseFloat(message.toString());
    console.log(`Received: ${topic} → ${value}`);

    // Save data to latestData object
    if (topic.includes("temperature")) latestData.temperature = value;
    else if (topic.includes("humidity")) latestData.humidity = value;

    // Insert into database when both values are available
    if (latestData.temperature !== null && latestData.humidity !== null) {
        db.run(
            "INSERT INTO sensor_data (temperature, humidity) VALUES (?, ?)",
            [latestData.temperature, latestData.humidity],
            (err) => {
                if (err) {
                    console.error("Insert Error:", err);
                } else {
                    console.log("Data Inserted");
                }
            }
        );

        // Reset data after insertion
        latestData = { temperature: null, humidity: null };
    }
});
