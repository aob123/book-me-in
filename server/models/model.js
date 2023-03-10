const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  category: {
    name: {
      required: true,
      type: String,
    },
    duration: {
      required: true,
      type: Number,
    },
  },
  start: {
    hour: {
      required: false,
      type: Number,
    },
    min: {
      required: false,
      type: Number,
    },
  },
  end: {
    hour: {
      required: false,
      type: Number,
    },
    min: {
      required: false,
      type: Number,
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
