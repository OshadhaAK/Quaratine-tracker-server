const express = require("express");
const router = express.Router();

const User = require("../models/User");


const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');



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
});



router.post('/login', async (req,res) => {

    const {error} = loginValidation(req.body);
    if(error)return res.send(error.details[0].message);

    const user = await User.findOne({emailaddress: req.body.emailaddress});
    if(!user) return res.send("Wrong Email Address!");


    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.send("Wrong Password!");


    /* const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token); */

    res.send({ name: user.name, message: 'Success'});

});

router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({emailaddress: req.body.emailemailaddress});
    if(emailExist) return res.status(400).send("Email already exists!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 

    const user = new User({
        name: req.body.name,
        emailaddress:  req.body.emailaddress,
        password: hashedPassword,
        regNo: req.body.regNo
    });
    
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;