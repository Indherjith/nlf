const mongoose = require("mongoose");

const NLF_DonateSchema = new mongoose.Schema({
    name : {type:String,required:true},
    address : {type:String,required:true},
    city : {type:String,required:true},
    state : {type:String,required:true},
    email:{type:String,require:true},
    mobileNumber:{type:Number,require:true},
    pincode : {type:Number, required:true},
    donatedAmount : {type:String, required:true},
    dateTime : {type:Number, required:true},
    paymentId : {type:String, required:true}
})

const NLF_DonateModel = mongoose.model("NLF_Donate",NLF_DonateSchema);

module.exports = {
    NLF_DonateModel
}