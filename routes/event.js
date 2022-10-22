
const express = require('express');
const bcrypt =require("bcryptjs")
const jwt=require("jsonwebtoken")
const adminAuth = require('../middleware/admin')
const userAuth = require('../middleware/user')
const usermodel = require('../models/usermodel');
const tokenmodel = require('../models/tokenmodel');

let router = express()
router.post('/event/management', async (req, res) => {
    try {
        
        var { a,b, c,d,e} = req.body
        if (a == undefined || a == null) {
            res.status(200).json({
                status: false,
                msg: "name is invalid"
            })

            return;
        }

        if (typeof a !== 'string') {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of name"
            })
            return;
        }
        
        if (c == undefined || c == null) {
            res.status(200).json({
                status: false,
                msg: " email is invalid"
            })
            return;
        }

        if (typeof c !== "string") {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of email"
            })
            return;
        }
        if (d == undefined || d == null) {
            res.status(200).json({
                status: false,
                msg: "phone is invalid"
            })
            return;
        }
        if (typeof d !== "number") {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of phone"
            })
            return;
        }
        if (e == undefined || e == null) {
            res.status(200).json({
                status: false,
                msg: "password is invalid"
            })
            return; 
        }
        if (typeof e!== "string") {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of password"
            })
            return;
        }
        var alreadyexists =await usermodel.findOne({phone:d})
        console.log(alreadyexists)
            if(alreadyexists!=null || alreadyexists!=undefined){
                
                res.status(200).json({
                    status:false,
                    msg:"phoneNumber already exists"
                })
                return;
            }
            var  encpass=await bcrypt.hash(e,10);
            var data=new usermodel();
        data.name=a;
        data.role=b;
        data.email=c;
        data.phone=d;
        data.password=encpass;
        await data.save();
        console.log(data)
        res.status(200).json
            ({
                status: true,
                data:data


            })
            
        return;
    }
    catch (e) {
        console.log(e);
    }
});

router.post('/login',async(req,res)=>{
   
    try{
        var {Phone,Password}= req.body

        var user = await usermodel.findOne({phone:Phone})
        if(user==null || user == undefined){
            res.status(200).json({
                status:false,
                msg:"invalid credentials"
            })
            return;
        }
        if(await bcrypt.compare(Password,user.password)){
            var token =jwt.sign({user:user},"key");
            var tokenData= new tokenmodel();
            tokenData.userId= user._id;
            tokenData.token= token;
            await tokenData.save()
            return  res.status(200).json({
                status:true,
                msg:"Login Successful",
                token:tokenData
            })

            
        }else{
            return res.status(200).json({
                status:false,
                msg:"Password is wrong!!!"
            })
        }
       
    }catch(error){
        return console.log(error);
    }
    
})

    router.post('/eventApp/validateToken',async(req,res)=>{
                    try{
                    var {tokenPost}=req.body;
                
                    console.log(tokenPost);
                    if(tokenPost==undefined||tokenPost==null){
                        res.status(200).json
                        ({
                            status:false,
                            msg:"Invalid"
                        })
                        return;
                
                    }
                    var user=await tokenmodel.findOne({token:tokenPost});
                    if(user==null||user==undefined){
                        res.status(200).json
                        ({
                            status:false,
                            msg:"user not found"
                        })
                        return;
                    }
                    else{
                        res.status(200).json
                        ({
                            status:true,
                            msg:"user found",
                            data:user
                        })
                        return;   
                    }
                    }
                    catch(e)
                    {
                        console.log(e);
                    }
                })
                 

router.post("/user/me",adminAuth, async(req,res)=>{
    try{

        return res.status(200).json({
            status:true,
            msg:"Login Successfully using Token",
        })
    }
    catch(error){
        console.log(error)
        return res.status(200).json({
            status:false,
            msg:error
        })
    }
})

module.exports = router;
