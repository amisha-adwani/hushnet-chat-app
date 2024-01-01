const express = require("express");
const Room = require("../models/Room");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const rooms = await Room.find();
      console.log("Fetched rooms:", rooms);
      res.json({ rooms });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
module.exports = router;