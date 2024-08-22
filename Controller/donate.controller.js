const {NLF_DonateModel} = require('../Models/NLF_Donate.model');
const axios = require('axios');

const DonateHandler= async(req,res)=>{
    if(req.body.paymentId){
        const donate = new NLF_DonateModel({...req.body,donatedAmount:"",dateTime:0,paymentId:""});
        try{
            await donate.save();
            res.json({"msg" : "Thank you for Being a part of Natural Life Foundation."});
        }
        catch(err){
            console.log(err)
            res.json({"msg":"Smething went wrong! If any amount debited, will be refunded within 7 working days."});
        }
    } else{
        console.log(req.body);
        res.json({"msg":"Something went wrong, plz try again"});
    }
        
}

const success = async(req, res) => {
    const body = req.body;

    const paypalAuthAlgo = req.headers['paypal-auth-algo'];
    const paypalCertUrl = req.headers['paypal-cert-url'];
    const paypalTransmissionId = req.headers['paypal-transmission-id'];
    const paypalTransmissionSig = req.headers['paypal-transmission-sig'];
    const paypalTransmissionTime = req.headers['paypal-transmission-time'];
    const webhookId = '2S213648J3485193T'; // Replace with your webhook ID

    try {
        const response = await axios.post('https://api.sandbox.paypal.com/v1/notifications/verify-webhook-signature', {
            auth_algo: paypalAuthAlgo,
            cert_url: paypalCertUrl,
            transmission_id: paypalTransmissionId,
            transmission_sig: paypalTransmissionSig,
            transmission_time: paypalTransmissionTime,
            webhook_id: webhookId,
            webhook_event: body,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR-ACCESS-TOKEN`, // Use your sandbox access token
            },
        });

        if (response.data.verification_status === 'SUCCESS') {
            // Process the event
            if (body.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
                const transactionId = body.resource.id;
                const amount = body.resource.amount.value;

                console.log('Transaction ID:', transactionId);
                console.log('Amount:', amount);

                // Respond to PayPal to confirm receipt of the webhook
                res.status(200).send('Webhook received');
            } else {
                res.status(400).send('Event not handled');
            }
        } else {
            res.status(400).send('Invalid signature');
        }
    } catch (error) {
        console.error('Error verifying webhook:', error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = { DonateHandler,success }
