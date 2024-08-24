const {Router} = require('express');
const { Register,getdata } = require('../Controller/register.controller');
const RegisterRouter = Router();

RegisterRouter.get("/",getdata);
RegisterRouter.post('/',Register);

module.exports = { RegisterRouter };
