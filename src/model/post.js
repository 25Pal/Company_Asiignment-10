const mongoose = require("mongoose");
// const objectId=mongoose.objectId;
const objectId= mongoose.Schema.Types.ObjectId  ;


const postSchema= new mongoose.Schema({

    userId:{
        type:objectId,
        ref:"user"
    },
    likes:{
        type:Number,
        trim:true,
        default:0
    },
    comment:{
        type:Number,
        trim:true,
        default:0
    },
    isDeleted:{
        type:Boolean,
        trim:true,
        default:false

    }
},{timestamps:true})

module.exports= mongoose.model("post",postSchema);