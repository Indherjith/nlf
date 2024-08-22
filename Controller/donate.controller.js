const {NLF_DonateModel} = require('../Models/NLF_Donate.model');
const axios = require('axios');

const DonateHandler= async(req,res)=>{
    const donate = new NLF_DonateModel({...req.body});
    try{
        await donate.save();
        res.json({"msg" : "Thank you for Being a part of Natural Life Foundation."});
    }
    catch(err){
        console.log(err);
        alert('error');
    }
        
}

async function getPayPalAccessToken() {
    const clientId = 'Abzoz8Wu8g7HmDPdgCabLjQLsVNKfcFlJRPS43Mp6WL3EGk3clLNcPnoYYLNbBq3URsZJc7E_f-eKojj'; // Replace with your PayPal client ID
    const clientSecret = 'ENMEhx9VITZIcLrhxmW1gJ-VRiGuoBvoBHCM57ovlBT5Bj4qkc1j_7IxN7S6sGB9w10B37s2GvSf9id1'; // Replace with your PayPal client secret

    try {
        const response = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
            auth: {
                username: clientId,
                password: clientSecret,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting PayPal access token:', error);
        throw error;
    }
}



const success = async(req, res) => {
    console.log('entered');
    
    const body = req.body;

    const paypalAuthAlgo = req.headers['paypal-auth-algo'];
    const paypalCertUrl = req.headers['paypal-cert-url'];
    const paypalTransmissionId = req.headers['paypal-transmission-id'];
    const paypalTransmissionSig = req.headers['paypal-transmission-sig'];
    const paypalTransmissionTime = req.headers['paypal-transmission-time'];
    const webhookId = '2S213648J3485193T'; // Replace with your webhook ID
    const accessToken = await getPayPalAccessToken();

    try {
        console.log('tried');
        
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
                'Authorization': `Bearer ${accessToken}`, // Use your sandbox access token
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
            console.log('failed');
            
        }
    } catch (error) {
        console.error('Error verifying webhook:', error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = { DonateHandler,success }
