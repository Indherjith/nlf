const {Router} = require('express');
const { Register } = require('../Controller/register.controller');
const RegisterRouter = Router();

RegisterRouter.post('/',Register);

module.exports = { RegisterRouter };
