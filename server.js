// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Routes
// app.get('/', (req, res) => {
//     res.send('Backend server is running!');
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Schema & Model
const WeatherSchema = new mongoose.Schema({
  location: String,
  dateRange: String,
  temperature: String,
});
const Weather = mongoose.model('Weather', WeatherSchema);

// CRUD Routes
// Create
app.post('/api/weather', async (req, res) => {
  const { location, dateRange, temperature } = req.body;
  try {
    const newWeather = new Weather({ location, dateRange, temperature });
    await newWeather.save();
    res.status(201).json(newWeather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read
app.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
app.put('/api/weather/:id', async (req, res) => {
  const { id } = req.params;
  const { location, dateRange, temperature } = req.body;
  try {
    const updatedWeather = await Weather.findByIdAndUpdate(id, { location, dateRange, temperature }, { new: true });
    res.status(200).json(updatedWeather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
app.delete('/api/weather/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Weather.findByIdAndDelete(id);
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
