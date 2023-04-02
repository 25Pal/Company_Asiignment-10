const commentModel= require("../model/comment")
const postModel=require("../model/post")
const userModel=require("../model/user")

const createComment= async function(req,res){
    let data= req.body;
    let checkPost = await postModel.findOne({_id:data.postId});
    let userExist= await userModel.findOne({_id:data.userId});
    if(!userExist){
        return res.send({msg:"No such user exists !"})
    }
    if(!checkPost ){
        return res.send({msg:"No such post found !"});
    }
    if(checkPost.isDeleted == true){
        return res.send({msg:"This post already has been deleted !"});
    }

    let cmt= await commentModel.create(data);
    await postModel.findOneAndUpdate({_id:data.postId},{$inc:{comment:1}});
    return res.send({msg:`You commented on ${cmt.postId} this post .`,Comment:cmt.comment ,reply:cmt.replay});

}

const giveReply= async function(req,res){
    let cmtId= req.params.commentId;
    let body=req.body; //will require userId any 
    if(body.userId){

    }
    let searchComment = await commentModel.findOne({_id:cmtId}).select({postId:1,comment:1,reply:1});
    if(!searchComment){
        return res.send({msg:"No Comment exists !"});
    }

    if(searchComment.isDeleted==true){
        return res.send({msg:"Comment Has been Deleted !"});
    }

    let addReply= await commentModel.findOneAndUpdate({_id:cmtId},{$push: {reply:body.reply}},{new:true})

return res.send({msg:`You commented on this ${cmtId} .`, Data:addReply});
}

const getComments= async function(req,res){
    let postId= req.params.postId;

    let checkPost = await postModel.findOne({_id:postId});

    if(!checkPost){
        return res.send({msg:"Post is not Available !"});
    }
    if(checkPost.isDeleted==true){
        return res.send({msg:"Post Has been Deleted !"});
    }
    let cmt=[];
    let getAllComment= await commentModel.find({postId:postId});
   for(let i= 0;i<getAllComment.length ;i++){
    cmt.push(getAllComment[i].comment);
   }
    
    return res.send({msg:"Post Comments :", Comments:cmt});

}




const deleteComment= async function(req,res){
    let commentId= req.params.commentId;

    let checkComment=await commentModel.findOne({_id:commentId});
    if(!checkComment){
        return res.send({msg:"Comment is not Available !"});
    }
    if(checkComment.isDeleted==true){
        return res.send({msg:"Comment Has been Deleted !"});
    }
    
   await commentModel.findOneAndUpdate({_id:commentId},{isDeleted:true},{new:true})
   await postModel.findOneAndUpdate({_id:checkComment.postId},{$inc:{comment:-1}},{new:true});

   return res.send({msg:"Comment deleted succefully"})

    
}
module.exports={createComment,giveReply,getComments,deleteComment}