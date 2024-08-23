const {Router} = require('express');
const {DonateHandler} = require('../Controller/donate.controller');

const DonateRouter = Router();

DonateRouter.post('/',DonateHandler);

module.exports = { DonateRouter }