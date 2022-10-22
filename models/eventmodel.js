const mongoose = require('mongoose');
var eventmodelSchema= mongoose.Schema({
    status:{
        type:String,
        default:"Active"
    },
     name:{
        type:String
     },
     
     
     fromdate:{
        type:Date
     },
    todate:{
        type:Date

     },
     venue:{
        type:String

     },
     host:{
        type:String

     }
     

})
module.exports=mongoose.model("eventmodel",
     eventmodelSchema)