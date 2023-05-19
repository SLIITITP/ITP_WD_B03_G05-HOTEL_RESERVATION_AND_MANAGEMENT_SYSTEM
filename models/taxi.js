const mongoose = require("mongoose");

const taxiSchema = mongoose.Schema({
    name : {
        type: String ,
        required : true
    },
    maxcount : {
        type : String ,
        required : true    
    },
    rentperday : {
        type : String ,
        required : true    
    },
    imageurls : [],

    currentbookings : [],

    description :{
        type : String,
        required : true
    }

} , {
    timestamps : true, 

} )


const taxiModel = mongoose.model('taxis' , taxiSchema)

module.exports = taxiModel