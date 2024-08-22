const {Router} = require('express');
const {EventBooking} = require("../Controller/events.controller");
const EventRouter = Router();


EventRouter.get("/",EventBooking);


module.exports = { EventRouter }