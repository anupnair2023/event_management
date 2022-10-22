const express = require('express');
const adminAuth = require('../middleware/admin');
const userAuth = require('../middleware/user');




const eventmodel = require("../models/eventmodel");
let router = express()
router.post('/event/model', adminAuth,async (req, res) => {
    try {
        var data=new eventmodel();
        var { a, c,d,e,f} = req.body
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
        }

        
        
        if (c == undefined || c == null) {
            res.status(200).json({
                status: false,
                msg: " fromdate is invalid"
            })
            return;
        }

        if (typeof c !== "string") {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of fromdate"
            })
        }
        if (d == undefined || d == null) {
            res.status(200).json({
                status: false,
                msg: "todate is invalid"
            })
            return;
        }
        if (typeof d !== "string") {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of todate"
            })
        }
        if (e == undefined || e == null) {
            res.status(200).json({
                status: false,
                msg: "venue is invalid"
            })
            return; 
        }
        if (typeof e!== "string") {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of venue"
            })
        }
        if (f == undefined || f == null) {
            res.status(200).json({
                status: false,
                msg: "host is invalid"
            })
            return; 
        }
        if (typeof f!== "string") {
            res.status(200).json({
                status: false,
                msg: "invalid datatype of host"
            })
        }
        data.name=a;
        
        data.fromdate=c;
        data.todate=d;
        data.venue=e;
        data.host=f;
        res.status(200).json
            ({
                status: true,
                data:data


            })
            await data.save();
        return;
    }
    catch (e) {
        console.log(e);
    }
});
router.post('/event/list',adminAuth, async (req, res) => { 
    
    try {
        var displayList = await eventmodel.find({status: "Active" })
        
        res.status(200).json
                (
                    {
                        status: true,
                        output:displayList
                    }
                )
            return
    }
    catch (e) {
        console.log(e)
    }
})
router.post('/event/view',adminAuth, async (req, res) => { 
    
    try {
        var {id} = req.body;
        if (id == null || id == undefined) {
            res.status(200).json({
                status: false,
                msg: "id not given "
            })
            return;
        }
        var eventVeiw = await eventmodel.findOne({_id:id})
        console.log(eventVeiw)
        
        res.status(200).json
                (
                    {
                        status: true,
                        output:eventVeiw
                    }
                )
            return
    }
    catch (e) {
        console.log(e)
    }
})
router.post('/event/delete',adminAuth, async (req, res) => { 
    
    try {
        var {id} = req.body;
        var eventDelete = await eventmodel.findOne({_id: id })
        eventDelete.status="Delete"
        res.status(200).json
                (
                    {
                        status: true,
                        msg:"event Deleted"
                    }
                )
            return
    }
    catch (e) {
        console.log(e)
    }
})
router.post('/event/edit',adminAuth, async (req, res) => { 

    try {
        var { EName, from, to, venue, host ,id} = req.body;
        if (id == null || id == undefined) {
            res.status(200).json({
                status: false,
                msg: "id not given "
            })
            return;
        }

        var eventexists = await eventmodel.findOne({ _id: id})
        if (eventexists == null || undefined) {
            res.status(200).json({
                status: false,
                msg: "event doesn't exist in database "
            })
            return;
        }
        if(EName!=null||EName!=undefined){
            eventexists.name=EName
        }
        if(from!=null||from!=undefined){
            eventexists.from=from
        }
        if(to!=null||to!=undefined){
            eventexists.to=to
        }
        if(venue!=null||venue!=undefined){
            eventexists.venue=venue
        }
        if(host!=null||host!=undefined){
            eventexists.host=host
        }
        await eventexists.save()



        res.status(200).json
                (
                    {
                        status: true,
                        output: eventexists
                    }
                )
            return
    }
    catch (e) {
        console.log(e)
    }
})
router.post('/user/profile/withtoken',userAuth,async(req,res)=> {
    try{
        var userid = req.user.user._id;
            console.log(userid)
            res.status(200).json({
                status:true,
                output:userid
        })
        return;
    }     

catch(e)
{
    console.log(e)
}
})
module.exports = router;

//asdghasdghjasdkjkasgdhjasg