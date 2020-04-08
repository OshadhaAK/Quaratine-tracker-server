const express = require("express");
const router = express.Router();

const Notify = require('../models/Notify');
const Quarantinee = require("../models/Quarantinee");

var TeleSignSDK = require('telesignsdk');

const customerId = "B5A13CCA-F569-45DA-B4FF-E92FB0D95AB9";
const apiKey = "jq5WuaS4AmPDeys4Dp/k1xqFARD7Ul8Gy8phNKrDBeNjLrtHlf+8yhSryapkRPgUtfamN+FXRrYxqEH1vFh50Q==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

const phoneNumber = "+94712251841";
const message = "Covid-19  ID: 12312 is Out of Range";
const messageType = "ARN";

console.log("## MessagingClient.message ##");

router.post("/sendnotification/:band", async (req,res) => {
    console.log("sms send");
    try {
        /* const notify = new Notify({
            band: req.body.band,
            hasMoved: req.body.hasMoved
        });
        client.sms.message(messageCallback, phoneNumber, message+" BAND ID: "+notify.band, messageType);
        const savedNotification = await notify.save();
        res.status(201).json({
            message: "Handling SMS POST request",
            Notification:  savedNotification 
        }); */
        const bandInfo = req.params.band;
        const newLocation = '51.723858;7.895982'
        const updatedBand = await Notify.updateOne(
            {band: bandInfo},
            {
                $set: {
                    hasMoved: false
                    
                },
                $push: {
                    location: newLocation
                }
            }
        );
        await Quarantinee.updateOne(
            {band: bandInfo},
            {
                $set: {
                    hasMoved: false
                }
            }
        );
        res.status(200).json(updatedBand);
    }catch (err) {
        res.status(500).json({ message: err }); 
    }
    
});

async function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}

router.get("/", async (req,res) => {
    try {
        const band = await Notify.find();
        res.status(200).json(band);
    }catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/:bandId", async (req,res) => {
    try{
        const id = req.params.bandId;
        const quarantinee = await Notify.find({band: id});
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