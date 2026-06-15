const express = require("express");
const Weather = require("../models/Weather");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const weather = new Weather(req.body);
    await weather.save();
    res.status(201).json(weather);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedWeather = await Weather.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedWeather);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Weather.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
