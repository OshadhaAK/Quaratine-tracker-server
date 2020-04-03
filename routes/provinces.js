const express = require("express");
const router = express.Router();

const Province = require("../models/Province");

router.get("/", async (req,res) => {
    try {
        const provinces = await Province.find();
        res.status(200).json(provinces);
    }catch (err) {
        res.status(500).json({ message: err });
    }
});



router.post("/", async (req, res) => {
    const myprovince = new Province({
        central: req.body.central
        
    });

    try {
        const savedProvince = await myprovince.save();
        res.status(201).json({
            message: "Handling POST request",
            createdProvince: savedProvince
        });
    }catch (err) {
        res.status(500).json({ message: err }); 
    }
});

module.exports = router;