const mongoose = require('mongoose');

var bookingModelSchema = mongoose.Schema({
    status:{
        type:String,
        default:"Active"
    },
    name:{
        type:String
    },
     
    seat:{
        type:Number
    },
    adult:{
        type:Number
    },
    children:{
        type:Number
    },
    amount:{
        type:Number
    },
    eventid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"eventModel"
    },
    bookdate:{
        type:Date,
        default: new Date()
    }

})
module.exports =mongoose.model("bookingModel",bookingModelSchema);