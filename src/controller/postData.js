const postModel = require("../model/post")
const userModel= require("../model/user")

const createPost= async function(req,res){
    let data= req.body;
console.log(data)
    let info=await postModel.create(data);
    return res.send({msg:"Post Uploded sucessfully !",data:info});
}

const updatePost= async function(req,res){
    let postId=req.params.postId ;

    let checkPost= await postModel.findOne({_id:postId});
    if(!checkPost){
        return res.send({msg:"No such Post found !"});
    }
    if(checkPost.isDeleted == true){
        return res.send({msg:"This post already has been deleted !"});
    }
    let Data=req.body;
    const {likes , comment }=Data;
    if(likes && comment ){
        let updateData=await postModel.findOneAndUpdate({_id:postId},{likes:likes,comment:comment},{new:true});
        return res.send({msg:"Likes and Comment updated sucessfully !",data:updateData}) 
    }else if(likes ){
        let updateLike=await postModel.findOneAndUpdate({_id:postId},{$inc:{likes:1}},{new:true});
        return res.send({msg:"You liked the post !" ,data:updateLike.likes}) 
    }
}

const deletePost=async function(req,res){//Authentication  not yet implemented
    let userId = req.params.userId;
    let data=req.body;
   
    //check this userId and the postId's useId's matching or not
    let postData= await postModel.findOne({_id:data.postId});
    if(!postData){
        return res.send({msg:"No such post found!"})
    }
    if(postData.isDeleted == true){
        return res.send({msg:"This post already has been deleted !"});
    }
    console.log(postData.userId,userId);
    if(postData.userId == userId){
        await postModel.findOneAndUpdate({_id:data.postId},{isDeleted:true,likes:0,comment:0},{new:true});
        return res.send({msg:"Post Deleted Succesfuly !!!"});
    }else{
        return res.send({msg:"Your not Authorised !"});
    }


    
}

const likePost= async function(req,res){
    let postId=req.query.postId;

    let checkPost= await postModel.findOne({_id:postId});
    if(!checkPost){
        return res.send({msg:"Post is not available"})
    }
    if(checkPost.isDeleted==true){
        return res.send({msg:"Post has been deleted !"}) 
    }
    let userName = await userModel.findOne({_id:checkPost.userId})
    await  postModel.findOneAndUpdate({_id:postId},{$inc:{likes:1}});

    return res.send({msg:`You have liked ${userName.name}'s post`});
}
module.exports= {createPost,updatePost,deletePost,likePost}