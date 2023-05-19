const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    dayout : {
        type: String ,
        required : true
    },
    dayoutid : {
        type : String ,
        required : true    
    },
    userid : {
        type : String ,
        required : true    
    },
    fromdate : {
        type : String ,
        required : true    
    },
    todate : {
        type : String ,
        required : true    
    },
   totalAmount : {
        type : Number ,
        required : true    
    },
    totalDays : {
        type : Number ,
        required : true    
    },

    transactionId : {
        type : String ,
        required : true
    },
    status :{
        type : String,
        required : true ,
        default : 'booked'
    }




} , {
    timestamps : true,
})


const bookingdmodel = mongoose.model('bookingsd' , bookingSchema);

module.exports = bookingdmodel