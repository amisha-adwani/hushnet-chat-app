const express = require("express");
const Room = require("../models/Room");
const router = express.Router();

router.get('/', async(req,res) =>{
    const rooms = await Room.find()
    res.json({rooms}) 
})

module.exports = router;