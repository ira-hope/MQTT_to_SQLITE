

# Weather Data Graph

This project displays temperature and humidity data on graphs using Chart.js. The data is served by a Node.js server and stored in an SQLite database.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ira-hope/MQTT_to_SQLITE.git
cd MQTT_to_SQLITE
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

```bash
npm install
```

### 3. Set Up the Database

Create an SQLite database called `weather_data.db` with a table `sensor_data`:

```sql
CREATE TABLE IF NOT EXISTS sensor_data (
    timestamp INTEGER,
    temperature REAL,
    humidity REAL
);
```

Insert some data for testing purposes.

### 4. Start the Server

Run the following command to start the server:

```bash
node server.js
```

The application will be available at `http://localhost:3000`.

### 5. View the Graphs

Open your browser and go to `http://localhost:3000` to see the temperature and humidity graphs.

