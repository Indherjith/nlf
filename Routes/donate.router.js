const {Router} = require('express');
const {DonateHandler, success} = require('../Controller/donate.controller');

const DonateRouter = Router();

DonateRouter.post('/',DonateHandler);
DonateRouter.post('/paypal-webhook',success);

module.exports = { DonateRouter }