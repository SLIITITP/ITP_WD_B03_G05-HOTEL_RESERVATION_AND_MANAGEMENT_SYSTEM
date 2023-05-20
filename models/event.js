const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
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


const eventModel = mongoose.model('events' , eventSchema)

module.exports = eventModel //exporting module
