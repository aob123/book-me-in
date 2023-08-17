const express = require("express");
const router = express.Router();
const Model = require("../models/model");
module.exports = router;

const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

//Set todays date, and set hours and minutes to 0
const d = new Date();
const today = dayjs().set("hour", "0").set("minute", "0");


//Post Method
router.post("/post", async (req, res) => {
  const booking = new Model({
    name: req.body.name,
    category: req.body.category,
    start: req.body.start,
    end: req.body.end,
  });

  try {
    const dataToSave = await booking.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const bookings = await Model.find({
      createdAt: {
        $gte: today,
      },
    });
    // console.log("GET ALL", bookings);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const booking = await Model.findById(req.params.id);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Model.findByIdAndDelete(id);
    res.send(`Document with ${id} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
