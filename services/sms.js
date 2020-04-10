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
        
        const savedNotification = await notify.save();
        res.status(201).json({
            message: "Handling SMS POST request",
            Notification:  savedNotification 
        }); */
        
        const bandInfo = req.params.band;
        console.log(bandInfo)
        const infoArr =  bandInfo.split("_");
        console.log(infoArr)
        const bandID = infoArr[0];
        const temp_lat2 = infoArr[1];
        const temp_lon2 = infoArr[2];


        const newLocation = String(temp_lat2)+";"+String(temp_lon2);
        
        const temp_quarantinee = await Quarantinee.find({band: bandID});
        const center = temp_quarantinee[0].gps.split(";");
        console.log(temp_quarantinee,center);
        const temp_lat1 = center[0];
        const temp_lon1 = center[1];
        
        
        console.log(temp_lat1,temp_lon1,temp_lat2,temp_lon2)
        const distance = getDistanceFromLatLonInm(temp_lat1,temp_lon1,temp_lat2,temp_lon2);
        console.log("distance",distance);

        if(distance>10){
            console.log("greater",distance);
            
            const updatedBand = await Notify.updateOne(
                {band: bandID},
                {
                    $set: {
                        hasMoved: true
                        
                    },
                    $push: {
                        location: newLocation
                    }
                }
            );
            await Quarantinee.updateOne(
                {band: bandID},
                {
                    $set: {
                        hasMoved: true
                    }
                }
            );
            res.status(200).json(updatedBand);
            client.sms.message(messageCallback, phoneNumber, message+" BAND ID: "+temp_quarantinee[0].band, messageType);
        }
        else{
            console.log("less",distance);
            const updatedBand = await Notify.updateOne(
                {band: bandID},
                {
                    
                    $push: {
                        location: newLocation
                    }
                }
            );
            
            res.status(200).json(updatedBand);
        }




       
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

 function getDistanceFromLatLonInm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d*1000;
}

 function deg2rad(deg) {
  return deg * (Math.PI/180)
}
module.exports = router;