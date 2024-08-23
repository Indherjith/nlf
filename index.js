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

app.post('/paypal/webhook', (req, res) => {
  const transmissionId = req.headers['paypal-transmission-id'];
  const timestamp = req.headers['paypal-transmission-time'];
  const webhookId = 'YOUR-WEBHOOK-ID'; // replace with your webhook ID from PayPal
  const certUrl = req.headers['paypal-cert-url'];
  const authAlgo = req.headers['paypal-auth-algo'];
  const transmissionSig = req.headers['paypal-transmission-sig'];

  const body = JSON.stringify(req.body);

  // Validate the webhook event with PayPal
  const expectedSignature = crypto
      .createHmac('sha256', 'YOUR-WEBHOOK-SECRET') // replace with your webhook secret
      .update(transmissionId + '|' + timestamp + '|' + webhookId + '|' + body)
      .digest('base64');

  if (expectedSignature !== transmissionSig) {
      console.error('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
  }

  // Handle the event based on the type
  const eventType = req.body.event_type;
  if (eventType === 'PAYMENT.SALE.COMPLETED') {
      const transactionId = req.body.resource.id;
      const amountPaid = req.body.resource.amount.total;
      const payerEmail = req.body.resource.payer.email;

      console.log('Transaction ID:', transactionId);
      console.log('Amount Paid:', amountPaid);
      console.log('Payer Email:', payerEmail);

      // TODO: Store transaction details in your database or perform other actions
  }

  res.status(200).send('OK');
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