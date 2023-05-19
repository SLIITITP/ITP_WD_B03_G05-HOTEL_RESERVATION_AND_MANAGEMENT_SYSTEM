const express = require("express");
const router = express.Router();
const Regevent = require("../models/regevent");

router.post("/", async (req, res) => {
  try {
    const { name, nic, phone, email, vrno } = req.body;

    if (!name || !nic || !phone || !email || !vrno) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRegevent = new Regevent({
      name,
      nic,
      phone,
      email,
      vrno,
    });

    const regevent = await newRegevent.save();
    res.status(200).json({ message: "Taxi registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.get("/getallregevent", async (req, res) => {
  try {
    const regevents = await Regevent.find();
    res.status(200).json(regevents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve registered events" });
  }
});

router.delete("/deleteregevent/:regeventid", async (req, res) => {
  const regeventid = req.params.regeventid;

  try {
    const regevent = await Regevent.findByIdAndDelete(regeventid);
    if (!regevent) {
      return res.status(404).json({ error: "Regevent not found" });
    }
    res
      .status(200)
      .json({ message: `Regevent ${regevent._id} has been removed` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete regevent" });
  }
});

module.exports = router;
