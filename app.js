const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const routeUsers = require('./routes/users');


app.use(cors());
app.use("/api/users",routeUsers);

const routeQuarantinees = require('./routes/quarantinees');
app.use("/api/quarantinees",routeQuarantinees);

app.get("/", (req,res) => {
    res.send("Welcome to express tutorial!")
});

/* app.get("/api/courses", (req,res) => {
    res.send([1,2,3]);
}); */

mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true }, () =>
    console.log("connected to database!")
)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
