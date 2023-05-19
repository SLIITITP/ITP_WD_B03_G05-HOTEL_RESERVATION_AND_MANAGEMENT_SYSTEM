const express = require("express");
const router = express.Router();
const Regtaxi = require("../models/regtaxi");

router.post("/", async (req, res) => {
  try {
    const { name, nic, phone, email, vrno } = req.body;

    if (!name || !nic || !phone || !email || !vrno) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRegtaxi = new Regtaxi({
      name,
      nic,
      phone,
      email,
      vrno,
    });

    const regtaxi = await newRegtaxi.save();
    res.status(200).json({ message: "Taxi registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.get("/getallregtaxi", async (req, res) => {
  try {
    const regtaxis = await Regtaxi.find();
    res.status(200).json(regtaxis);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve registered taxis" });
  }
});

router.delete("/deleteregtaxi/:regtaxiid", async (req, res) => {
  const regtaxiid = req.params.regtaxiid;

  try {
    const regtaxi = await Regtaxi.findByIdAndDelete(regtaxiid);
    if (!regtaxi) {
      return res.status(404).json({ error: "Regtaxi not found" });
    }
    res
      .status(200)
      .json({ message: `Regtaxi ${regtaxi._id} has been removed` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete regtaxi" });
  }
});

module.exports = router;
