const mongoose = require('mongoose');
var usermodelSchema= mongoose.Schema({
    status:{
        type:String,
        default:"Active"
    },
     name:{
        type:String
     },
     role:{
        type:String,
        default :"Admin"
     },
     
     email:{
        type:String
     },
    phone:{
        type:Number

     },
     password:{
        type:String

     }
     

})
module.exports=mongoose.model("usermodel",
     usermodelSchema)