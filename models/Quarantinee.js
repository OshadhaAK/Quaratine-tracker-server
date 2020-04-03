const mongoose = require("mongoose");

const QuarantineeSchema = mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    age: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Quarantinees", QuarantineeSchema);