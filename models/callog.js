const mongoose = require("mongoose");
const Schema = new mongoose.Schema();
const callogSchema = {
  phoneNumber: {
    type: String,
  },
  callStatus: {
    // confirm, ended, failed,
    type: String,
  },
  statusDescription: {
    //busy, cancelled, wrong number
    type: String,
  },
  callAt: {
    type: String,
  },
  callEnd: {
    type: String,
  },
};

module.exports = mongoose.model("callog", callogSchema);
