const mongoose= require("mongoose");
const objectId=mongoose.Schema.Types.ObjectId;

commentSchema =new mongoose.Schema({
    postId:{
        type:objectId,
        ref :"post"
    },
    userId:{
        type:objectId,
        ref:"user"
    },
    comment:{
        type:String,
        trim:true
    },
    reply :[{
        type: String
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("comment",commentSchema);