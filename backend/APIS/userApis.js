const exp=require('express')

const userApi=exp.Router();

userApi.use(exp.json())

const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
userApi.post('/signup',expressAsyncHandler(async(request,response)=>{
    let userCollection=request.app.get('userCollection')
    let newuser=request.body
    let userofDB=await userCollection.findOne({name:newuser.name})
    // console.log(newuser)
    // console.log('end')
    // console.log(userofDB)
    if(userofDB==null){
        let hashedPassword= await bcryptjs.hash(newuser.password,6)
        newuser.password=hashedPassword;
        newuser.cpassword=hashedPassword;
        await userCollection.insertOne(newuser);
        response.send({message:"user created successfully"})
    }
    else {
        response.send({message:"Username already exists... please take another"})
    }
}))

userApi.post('/login',expressAsyncHandler(async(request,response)=>{
    let  userCollection=request.app.get('userCollection')
    let user=request.body
    console.log(user);
    let userofDB=await userCollection.findOne({name:user.name});
    console.log(userofDB);
    let status=await bcryptjs.compare(user.password,userofDB.password);
    
    if(status==true){
        let token=jwt.sign({username:user.username},'ABCD',{expiresIn:"2h"})
        response.send({message:true,payload:token})
    }
    else{
        response.send({message:false})
    }
}))

module.exports=userApi;