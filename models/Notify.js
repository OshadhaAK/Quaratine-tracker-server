const mongoose = require("mongoose");

const NotifySchema = mongoose.Schema({
    band: {
        type: Number,
        required: true
    },
    hasMoved: {
      type: Boolean,
      required: true
    },
    location: {
      type: Array,
      require: true
    }
});

module.exports = mongoose.model("Notifications", NotifySchema);