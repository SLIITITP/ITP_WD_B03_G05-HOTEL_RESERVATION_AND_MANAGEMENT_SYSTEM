const mongoose = require("mongoose");

const regtaxiSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    vrno: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Regtaxi = mongoose.model("Regtaxi", regtaxiSchema);
module.exports = Regtaxi;
