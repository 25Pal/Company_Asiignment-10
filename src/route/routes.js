const express= require("express")
const route= express.Router();

const {createUser,updateUser,loginUser}=require("../controller/userData")
const{createPost,updatePost,deletePost,likePost}=require("../controller/postData")
const{createComment,giveReply,getComments,deleteComment}=require("../controller/commentData")
const {authentication}=require("../Middleware/mid")

route.post("/createUser",createUser)
route.post("/Login",loginUser)
route.put("/updateUser/:userId",authentication,updateUser);

route.post("/createPost",authentication,createPost)
route.put("/updatePost/:postId",updatePost);
route.put("/likePost",likePost)
route.delete("/deletePost/:userId",deletePost)

route.post("/createComment",createComment)
route.put("/giveReply/:commentId",giveReply)
route.get("/getComments/:postId",getComments)
route.delete("/deleteComment/:commentId",deleteComment)

module.exports= route;