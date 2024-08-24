const express = require('express');
require('dotenv').config();
const connection = require('./Config/db');
const path = require('path');
const cors = require('cors');
const {RegisterRouter} = require('./Routes/register.route');
const {EventRouter} = require('./Routes/event.route');
const {DonateRouter} = require('./Routes/donate.router');
const bodyParser = require('body-parser');
const ipn = require('paypal-ipn');

const app = express();

const port = process.env.port || 443;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/events',EventRouter);
app.use('/donate',DonateRouter);
app.use('/register',RegisterRouter);
app.use(bodyParser.json());

app.get('/adminnlf', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'login.html'));
});

app.post('/admin/auth',(req,res)=>{
  const {userId,password} = req.body;
  if(userId != 'nlfadmin01'){
    res.json({'msg':"User Not Found!"});
  }
  else if(password != 'Foundation@org'){
    res.json({'msg':"Wrong Password"});
  }
  else if(userId == 'nlfadmin01' && password == 'Foundation@org'){
    res.json({'msg':`Welcome admin ${userId}`});
  }
  else{
    res.json({"msg":"Something went wrong try again!"})
  }
});


app.listen(port, async() => {
  try{
    await connection;
    console.log('Connected to database');
  }catch(error){
      console.log(error); 
  }
  console.log(`Server is listening on port ${port}`)
})