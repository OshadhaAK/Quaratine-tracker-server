const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    emailaddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Users", UserSchema);