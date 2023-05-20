
const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    event : {
        type: String ,
        required : true
    },
    eventid : {
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


const bookingmodel = mongoose.model('bookingsevent' , bookingSchema);

module.exports = bookingmodel //exporting module
