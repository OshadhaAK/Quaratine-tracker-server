const mongoose = require("mongoose");

const ProvinceSchema = mongoose.Schema({
    sabaragamuwaProvince: {
      type: Array,
      require: true
    },
    centralProvince: {
      type: Array,
      require: true
    }
});

module.exports = mongoose.model("Provinces", ProvinceSchema);