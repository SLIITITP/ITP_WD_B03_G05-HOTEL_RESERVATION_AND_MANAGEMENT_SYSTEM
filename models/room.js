const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name : {
        type: String ,
        required : true
    },
    maxcount : {
        type : String ,
        required : true    
    },
    rentperday : {
        type : Number ,
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


const roomModel = mongoose.model('rooms' , roomSchema)

module.exports = roomModel