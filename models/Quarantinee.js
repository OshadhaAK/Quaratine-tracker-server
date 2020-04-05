const mongoose = require("mongoose");

const QuarantineeSchema = mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    nic: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    address: {
      type: String,
      require: true
    },
    province: {
      type: String,
      require: true
    },
    district: {
      type: String,
      require: true
    },
    gn: {
      type: String,
      require: true
    },
    phi: {
      type: String,
      require: true
    },
    band: {
        type: Number,
        required: true
    },
    gsp: {
      type: String,
      require: true
    },
    startdate: {
      type: Date,
      require: true
    },
    enddate: {
      type: Date,
      require: true
    },
});

module.exports = mongoose.model("Quarantinees", QuarantineeSchema);