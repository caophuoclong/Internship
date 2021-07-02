const express = require("express");
const api = express.Router();
const api_controller = require("../controllers/api_controller");
const api_callog = require("../controllers/api_callog");
const api_auth = require("../controllers/api_auth");

api.post("/createacallog", api_callog.createAcallog);
api.get("/createacallog", api_callog.testApi);
api.get("/testapi", api_callog.testApi);
api.get("/showcallog", api_callog.showAcallog);
api.post("/auth/register", api_auth.register);
api.post("/auth/login", api_auth.login);
api.get("/auth/token_verify", api_auth.verifyToken);
module.exports = api;
