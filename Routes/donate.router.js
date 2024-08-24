const {Router} = require('express');
const {DonateHandler,getdata} = require('../Controller/donate.controller');

const DonateRouter = Router();

DonateRouter.post('/',DonateHandler);
DonateRouter.get('/',getdata);

module.exports = { DonateRouter }