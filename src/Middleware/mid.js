const userModel= require("../model/user")
const jwt = require("jsonwebtoken")
const authentication = async function(req,res,next){
    let Token= req.headers["x-api-key"];
    // console.log("t-"+To/ken)
    if(!Token){
        return res.send({msg:"Token is mandatory !"})
    }

    if(Token){
        jwt.verify(Token , "XYZ" ,(err,tokenDetail)=>{
            if(err){
                return res.send({msg:"Token is expired"})
            }
            req.tokenDetail= tokenDetail;
            next();
        })
    }else{
        return res.send({msg:"You are not Authenticate User !"})
    }
}

module.exports= {authentication}