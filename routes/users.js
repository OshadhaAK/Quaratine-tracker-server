const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/:userId", async (req,res) => {
    try {
        const id = req.params.userId;
        const user = await User.findById(id);
        if(user) {
            res.status(200).json(user);
        }else {
            res.status(404).json({ message: "No valid entry found" });
        }
    }catch (err) {
        res.status(500).json({ message: err });
    }    
});

router.post("/", async (req, res) => {
    const myuser = new User({
        name: req.body.name,
        emailaddress:  req.body.emailaddress,
        password: req.body.password,
        regNo: req.body.regNo
    });

    try {
        const savedUser = await myuser.save();
        res.status(201).json({
            message: "Handling POST request",
            createdUser: savedUser
        });
    }catch (err) {
        res.status(500).json({ message: err }); 
    }
});

router.patch("/:userId", async (req,res) => {
    try {
        const id = req.params.userId;
        const updatedUser = await User.updateOne(
            { _id: id },
            {
                $set: { name: req.body.name,
                        emailaddress: req.body.emailaddress,
                        password: req.body.password,
                        regNo: req.body.regNo
                      }
            }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err });
    }    
});

router.delete("/:userId", async (req, res) => {
    try {
        const id = req.params.userId;
        const removeUser = await User.deleteOne({ _id: id});
        res.status(200).json(removeUser);
    } catch (err){
        res.status(500).json({ message: err });
    }
})

module.exports = router;