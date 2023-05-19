const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingM");
const Taxi = require("../models/taxi");

const moment = require("moment");

const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51Mw0Y3GaX4dMd9PhApuTiyEpaLOGir6kJURdvenBBB8jQYlIsMpguv4YFq5389AWchHu2MBn212PhgU4o1nxPQEP00XysDvEmg"
);

//Book taxi

router.post("/booktaxi", async (req, res) => {
  const { taxi, userid, fromdate, todate, totalAmount, totalDays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: "lkr",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newbooking = new Booking({
        taxi: taxi.name,
        taxiid: taxi._id,
        userid,
        fromdate,
        todate,
        totalAmount,
        totalDays,
        transactionId: "1234",
      });

      const booking = await newbooking.save();

      const taxitemp = await Taxi.findOne({ _id: taxi._id });

      taxitemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: fromdate,
        todate: todate,
        userid: userid,
        status: booking.status,
      });

      await taxitemp.save();
    }

    res.send("Payement Successfull , Your taxi is Booked");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, taxiid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });

    bookingitem.status = "cancelled";
    await bookingitem.save();

    const taxi = await Taxi.findOne({ _id: taxiid });

    const bookings = taxi.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    taxi.currentbookings = temp;

    await taxi.save();

    res.send("Your Booking cancell succesfully");
  } catch (error) {
    console.log({ error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/deletebooking/:bookingid", async (req, res) => {
  const bookingid = req.params.bookingid;
  console.log(bookingid);

  try {
    const bookings = await Booking.findByIdAndDelete(bookingid);
    if (!bookings) {
      return res.status(404).json({ error: "booking not found" });
    }
    res
      .status(200)
      .json({ message: `booking ${bookings._id} has been removed.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
