const express = require('express');
require('dotenv').config();
const connection = require('./Config/db');
const path = require('path');
const cors = require('cors');
const {RegisterRouter} = require('./Routes/register.route');
const {EventRouter} = require('./Routes/event.route');
const {DonateRouter} = require('./Routes/donate.router');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.port || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/events',EventRouter);
app.use('/donate',DonateRouter);
app.use('/register',RegisterRouter);
app.use(bodyParser.json());

app.listen(port, async() => {
  try{
    await connection;
    console.log('Connected to database');
  }catch(error){
      console.log(error); 
  }
  console.log(`Server is listening on port ${port}`)
})