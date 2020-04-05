const mongoose = require("mongoose");

const DistrictSchema = mongoose.Schema({
    kegalle: {
        type: Array,
        require: true
      },
      rathnapura: {
        type: Array,
        require: true
      }
});

module.exports = mongoose.model("Districts", DistrictSchema);