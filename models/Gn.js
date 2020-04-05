const mongoose = require("mongoose");

const GnSchema = mongoose.Schema({
    ranwala: {
      type: Array,
      require: true
    },
    siyabalapitiya: {
      type: Array,
      require: true
    },
    panakawa: {
        type: Array,
        require: true
    }
});

module.exports = mongoose.model("Gns", GnSchema);