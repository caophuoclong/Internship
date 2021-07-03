const Callog = require("../models/callog");
module.exports = {
  createAcallog: async (req, res) => {
    console.log(req);
    const { phoneNumber, callStatus, statusDescription, callAt, callEnd } =
      req.body;
    try {
      const newCallog = await new Callog({
        phoneNumber,
        callStatus,
        statusDescription,
        callAt,
        callEnd,
      });
      await newCallog.save();
      console.log("success");
      res.status(200).send("long dep trai");
    } catch (error) {
      res.send(error);
    }
  },
  testApi: (req, res) => {
    res.send({ data: "Long dep trai" });
  },
  createNcallog: (req, res) => {},
  showAcallog: async (req, res) => {
    const data = await Callog.find({});

    res.status(200).send(data);
  },
};
