const mongoose = require('mongoose');
var tokenmodelSchema= mongoose.Schema({
    status:{
        type:String,
        default:"Active"
    },
     userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usermodel"
     },
     token:{
        type:String,
       
     },
     
     

})
module.exports=mongoose.model("tokenModel",tokenmodelSchema)