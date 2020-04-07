const mongoose = require("mongoose");

const NotifySchema = mongoose.Schema({
    band: {
        type: Number,
        required: true
    },
    hasMoved: {
      type: Boolean,
      required: true
    }
});

module.exports = mongoose.model("Notifications", NotifySchema);