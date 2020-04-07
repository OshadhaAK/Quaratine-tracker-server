const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

const routeUsers = require('./routes/users');
app.use("/api/users",routeUsers);

const routeQuarantinees = require('./routes/quarantinees');
app.use("/api/quarantinees",routeQuarantinees);

const routeProvinces = require('./routes/provinces');
app.use("/api/provinces",routeProvinces);

const routeDistricts = require('./routes/districts');
app.use("/api/districts",routeDistricts);

const routeGns = require('./routes/gns');
app.use("/api/gns",routeGns);


app.get("/", (req,res) => {
    res.send("Welcome to express tutorial!")
});

const smsService = require('./services/sms');
app.use("/api/notify",smsService);


mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log("connected to database!")
)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
