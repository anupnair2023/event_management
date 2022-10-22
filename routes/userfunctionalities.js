const express = require('express');
const bcrypt =require("bcryptjs")
const jwt=require("jsonwebtoken")
const userAuth = require('../middleware/user')
const usermodel = require('../models/usermodel');
const tokenmodel = require('../models/tokenmodel');
let router = express()
router.post('/upcoming/events',userAuth,async(req,res)=>{
    try{
        var upcomingevent = await eventModel.find({status:"Active"})
        res.status(200).json({
            status : true,
            output:upcomingevent
        })
        return;

    }
    catch(e){
        console.log(e)
    }
})




router.post('/event/details',userAuth,async(req,res)=>{
    try{
        var {id}=req.body
        if(id==undefined||id==null){
            res.status(200).json({
                status : false,
                msg : "Id is invalid"
            })
            return;
        }

        var details = await eventModel.findOne({_id:id})
        
        res.status(200).json({
            status : true,
            output:details
        })
        return;

    }
    catch(e){
        console.log(e)
    }
})

router.post('/user/signup', async (req, res) => {
    try {
        //const a=[7,4,3,2];
        //const s=[1,2,4,6];
        var { role, name, username, email, password, phone } = req.body
        //var b=a.split("+");
        if (role == undefined || role == null) {
            res.status(200).json({
                status: false,
                msg: "role is invalid"
            })
            return;
        }

        if (typeof role !== 'string') {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of role"
            })
            return;
        }

        if (name == undefined || name == null) {
            res.status(200).json({
                status: false,
                msg: "name is invalid"
            })
            return;
        }

        if (typeof name !== 'string') {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of name"
            })
            return;
        }

        if (username == undefined || username == null) {
            res.status(200).json({
                status: false,
                msg: "username is invalid"
            })
            return
        }

        if (typeof username !== 'string') {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of username"
            })
            return;
        }

        if (email == undefined || email == null) {
            res.status(200).json({
                status: false,
                msg: "email is invalid"
            })
            return
        }

        if (typeof email !== 'string') {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of email"
            })
            return;
        }

        if (password == undefined || password == null) {
            res.status(200).json({
                status: false,
                msg: "password is invalid"
            })
            return
        }

        if (typeof password !== 'string') {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of password"
            })
            return;
        }

        if (phone == undefined || phone == null) {
            res.status(200).json({
                status: false,
                msg: "phone is invalid"
            })
            return
        }

        if (typeof phone !== 'number') {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of phone"
            })
            return;
        }

        var alreadyexists = await usermodel.findOne({ phone: phone })

        if (alreadyexists != null || alreadyexists != undefined) {
            res.status(200).json({
                status: false,
                "msg": "phone number already exist",
            })
            return;
        }
        var encpass = await bcrypt.hash(password, 10);


        var sdata = new usermodel()
        sdata.role = role;
        sdata.name = name;
        sdata.username = username;
        sdata.email = email;
        sdata.password = encpass;
        sdata.phone = phone;
        await sdata.save();




        console.log(req.body);

        res.status(200).json
            ({
                status: true,
                data: sdata

            })
    }
    catch (e) {
        console.log(e);
    }
});

router.post('/booking/mod',userAuth,async (req, res) => {
    try {
        
        var { name, seat, adult, children,eventid } = req.body
        console.log(req.body);
        var adultAmount =500;
        var childrenAmount =300;

        
        if (names == undefined || names == null) {
            res.status(200).json({
                status: false,
                msg: "name is invalid"
            })
            return;
        }

        if (seat == undefined || seat == null) 
            {
                res.status(200).json({
                    status: false,
                    msg: "seat is invalid"
                })
                return;
            }

            if (adult == undefined || adult == null) {
                res.status(200).json({
                    status: false,
                    msg: "adult is invalid"
                })
                return
            }

            if (children == undefined || children == null) {
                res.status(200).json({
                    status: false,
                    msg: "children is invalid"
                })
                return
            }

            if (eventid == undefined || eventid== null) {
                res.status(200).json({
                    status: false,
                    msg: "eventid is invalid"
                })
                return
            }

            if (children+adult!=seat){
                res.status(200).json({
                    status: false,
                    msg: "seat not available"
                })
                return
            }

            var bdata = new bookingModel()
            bdata.name = name;
            bdata.seat = seat;
            bdata.adult = adult;
            bdata.children = children;
            bdata.userid = req.user.user._id;
            bdata.amount =(children*childrenAmount)+(adult*adultAmount);
            bdata.eventid=eventid;


            await bdata.save();

            res.status(200).json
                ({
                    status: true,
                    data: bdata


                })
                
        
        
    }
    catch (e) {
        console.log(e);
    }

});

router.post('/book/list',userAuth,async(req,res)=>{
    try{
        var blist = await bookingModel.findOne({status:"Active"})
        res.status(200).json({
            status : true,
            output:blist
        })
        return;

    }
    catch(e){
        console.log(e)
    }
})

router.post('/eventbook/view',userAuth,async(req,res)=>{
    try{
        var {id}=req.body
        if(id==undefined||id==null){
            res.status(200).json({
                status : false,
                msg : "Id is invalid"
            })
            return;
        }

        var bookview = await bookingModel.findOne({_id:id})
        res.status(200).json({
            status : true,
            output:bookview
        })
        return;

    }
    catch(e){
        console.log(e)
    }
})

module.exports = router;