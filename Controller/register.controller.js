const { NLF_RegisterModel } = require('../Models/NLF_Register.model');
require("dotenv").config();


const Register = async(req,res)=>{
    const {firstName,lastName,spouseFirstName,spouseLastName,email,mobileNumber,adults,children,volunteer,preference,comments} = req.body;
    const personexists = await NLF_RegisterModel.findOne({email});

    if(personexists?.email == email){
        res.json({"msg" : "Person Already Exists!"});
    }
    else{
        var volunteerstatus = (req.body.volunteer == 'yes')? true : false;
        const register = new NLF_RegisterModel({...req.body,volunteer:volunteerstatus});
        try{
            await register.save();
            res.json({"msg" : "Registration successfull"});
        }
        catch(err){
            console.log(err)
            res.json({"msg":"Something went wrong, plz try again"});
        }
    }
}

module.exports = { Register }