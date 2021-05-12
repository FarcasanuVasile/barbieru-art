const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// @route     GET  api/messages
// @desc      Get all messages
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    // get all messages and sort them by date
    const messages = await Message.find().sort({ date: -1 });
    // set the contacts to the request
    res.send({ status: "Success", data: messages });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
  }
});

// @route     POST  api/messages
// @desc      Add new message
// @access    Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email.").isEmail(),
    check(
      "body",
      "Please enter a message with 20 or more characters."
    ).isLength({ min: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, body, phone, email } = req.body;
    try {
      let msg = new Message({ name, email, body, phone });
      await msg.save();
      res.status(200).json({ msg: "Message saved with success." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);
// @route     PUT  api/messages/:id
// @desc      Update a message
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { name, body, phone, email } = req.body;
  const msgFields = {};
  if (name) msgFields.name = name;
  if (phone) msgFields.phone = phone;
  if (body) msgFields.body = body;
  if (email) msgFields.email = email;
  try {
    let msg = await Message.findById(req.params.id);
    if (!msg) {
      res.status(404).json({ msg: "Message not found." });
    }
    msg = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: msgFields },
      { new: true }
    );
    res.json({ status: "Success", data: msg });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route     DELETE  api/messages/:id
// @desc      Delete a message
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let msg = await Message.findById(req.params.id);
    if (!msg) {
      res.status(404).json({ msg: "Message not found" });
    }
    await Message.findByIdAndRemove(req.params.id);
    res.json({ status: "Success", msg: "Message deleted." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Export the router
module.exports = router;
