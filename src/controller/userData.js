const userModel = require("../model/user")
const jwt = require("jsonwebtoken")
async function createUser(req,res){
    let body= req.body;
    console.log(body);

    let checkEmail= await userModel.findOne({email:body.email});
    if(checkEmail){
        return res.send({msg:"Email alredy exist"})
    }


    let info = await userModel.create(body);
    return res.send(info)
}


const updateUser = async function (req,res){
    userId= req.params.userId;
    let checkUser= await userModel.findOne({_id:userId})
    if(!checkUser){
        return res.send({msg:"No User Found" })
    }
    data=req.body;
    if(Object.keys(data).length==0){
        return res.send("Please provide data to update")
    }
    const{email,password}=data;
    if(email&&password){
        let updatedEmail= await userModel.findOneAndUpdate({_id:userId},{email:email,password:password},{new:true});

        return res.send({msg:"Data Updated Succesfully !",Data:updatedEmail})

    }else  if(email){
        let updatedEmail= await userModel.findOneAndUpdate({_id:userId},{email:email},{new:true});
        return res.send({msg:"Email Updated Succesfully !",Data:updatedEmail})
    }else  if(password){
        let updatedPassword= await userModel.findOneAndUpdate({_id:userId},{password:password},{new:true});
        return res.send({msg:"Password Updated Succesfully !",Data:updatedPassword})

    }
}


const loginUser =async function(req,res){
    let body= req.body;
    console.log(body)
    const {email,password}=body;

    if(!email){
        return res.send({msg:"Email is required!"});
    }
    if(!password){
        return res.send({msg:"Password is required!"});
    }

    let checkData= await userModel.findOne({email:email,password:password});
    if(!checkData){
        return res.send({msg:"User Not Register!"});
    }
    
    let token = jwt.sign({userId:checkData._id},"XYZ");
    res.setHeader("x-api-key",token)

    return res.send({msg:"Login Sucessful !",Token:token})

}

















module.exports= {createUser,updateUser,loginUser}