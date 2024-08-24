const mongoose = require("mongoose");

const NLF_RegisterSchema = new mongoose.Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    email:{type:String,require:true},
    mobileNumber:{type:String,require:true},
    adults : {type:Number, required:true},
    children: {type:Number, required:true},
    volunteer: {type : Boolean, required:true},
    preference : {type :String, required : true},
    comments : {type : String},
    accommodation : {type : String, required : true},
    amt : {type:String},
    st : {type:String},
    tx : {type:String},
})

const NLF_RegisterModel = mongoose.model("NLF_Register",NLF_RegisterSchema);

module.exports = {
    NLF_RegisterModel
}
