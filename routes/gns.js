const express = require("express");
const router = express.Router();

const Gn = require("../models/Gn");

router.get("/", async(req,res) => {
    try{
        const gns = await Gn.find();
        res.status(200).json(gns);
    }catch(err){
        res.status(500).json({ message: err });
    }
});

router.post("/", async (req,res) => {
    const mygn = new Gn({
        ranwala: req.body.ranwala,
        siyabalapitiya: req.body.siyabalapitiya,
        panakawa: req.body.panakawa
    });

    try{
        const savedGn = await mygn.save();
        res.status(201).json({
            message: "Handling POST request",
            createdGn: savedGn
        });
    }catch(err){
        res.status(500).json({ message: err });
    }
});

module.exports = router;