const express = require("express");
const router = express.Router();

const Quarantinee = require("../models/Quarantinee");
const Notify = require('../models/Notify');

router.post("/", async (req, res) => {
    const myquarantinee = new Quarantinee({
        name: req.body.name,
        nic: req.body.nic,
        age: req.body.age,
        tel: req.body.tel,
        address: req.body.address,
        province: req.body.province,
        district: req.body.district,
        gn: req.body.gn,
        phi: req.body.phi,
        band: req.body.band,
        gps: req.body.gps,
        startdate: req.body.startdate,
        enddate: req.body.enddate, 
        hasMoved: req.body.hasMoved       
        /* name: req.body.name,
        age: req.body.age */
    });

    const newBand = new Notify({
        band: req.body.band,
        hasMoved: req.body.hasMoved 
    })

    try {
        const savedQuarantinee = await myquarantinee.save();
        const savedNotification = await newBand.save();
        res.status(201).json({
            message: "Handling POST request",
            createdQuarantinee: savedQuarantinee,
            createdBand: savedNotification
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

router.get("/:phi_id", async (req,res) => {
    try{
        const id = req.params.phi_id;
        const quarantinee = await Quarantinee.find({phi: id});
        if(quarantinee) {
            res.status(200).json(quarantinee);
        }else{
            res.status(404).json({ message: "No valid entry found" });
        }
    }catch (err){
        res.status(500).json({ message: err });
    }
});


module.exports = router;