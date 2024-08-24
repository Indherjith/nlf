const {NLF_DonateModel} = require('../Models/NLF_Donate.model');
const axios = require('axios');
const ipn = require('paypal-ipn');

const getdata = async(req,res)=>{
    let Regdata = await NLF_DonateModel.find();
    res.json({Regdata});
};

const DonateHandler= async(req,res)=>{
    const {name,address,city,state,mobileNumber,email,pincode,amt,tx,st,comments} = req.body;
    
    let times = Date.now();
    const donate = new NLF_DonateModel({name,address,city,state,mobileNumber,email,pincode,comments,'donatedAmount':`${amt} USD`,'paymentId':tx,'status':st});
    try{
        await donate.save();
        res.json({"msg" : "Thank you for Being a part of Natural Life Foundation."});
    }
    catch(err){
        console.log(err);
    }
        
}




module.exports = { DonateHandler,getdata }
