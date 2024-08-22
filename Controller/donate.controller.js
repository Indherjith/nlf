const {NLF_DonateModel} = require('../Models/NLF_Donate.model');

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
  
    // Validate and process the IPN/Webhook
    if (body.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
        const transactionId = body.resource.id;
        const amount = body.resource.amount.value;
  
        // Save the transaction ID and amount to your database
        // Update your records or notify the user, etc.
  
        res.status(200).send('Success');
    } else {
        res.status(400).send('Invalid notification');
    }
  }



module.exports = { DonateHandler,success }