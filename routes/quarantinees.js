const express = require("express");
const router = express.Router();

const Quarantinee = require("../models/Quarantinee");

router.post("/", async (req, res) => {
    const myquarantinee = new Quarantinee({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const savedQuarantinee = await myquarantinee.save();
        res.status(201).json({
            message: "Handling POST request",
            createdQuarantinee: savedQuarantinee
        });
    }catch (err) {
        res.status(500).json({ message: err }); 
    }
});

router.get("/", async (req,res) => {
    try {
        const quarantinees = await Quarantinee.find();
        res.status(200).json(quarantinees);
    }catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;