const express = require("express");
const router = express.Router();

const District = require("../models/District");

router.get("/", async (req,res) => {
    try{
        const districts = await District.find();
        res.status(200).json(districts);
    }catch(err){
        res.status(500).json({ message: err });
    }
});

router.post("/", async (req,res) => {
    const mydistrict = new District({
        kegalle: req.body.kegalle,
        rathnapura: req.body.rathnapura
    });

    try{
        const savedDistrict = await mydistrict.save();
        res.status(201).json({
            message: "Handling POST request",
            createdDistrict: savedDistrict
        });
    }catch(err){
        res.status(500).json({ message: err }); 
    }
});

module.exports = router;