const mongoose = require("mongoose");

const ProvinceSchema = mongoose.Schema({
    sabaragamuwa: {
      type: Array,
      require: true
    }
});

module.exports = mongoose.model("Provinces", ProvinceSchema);