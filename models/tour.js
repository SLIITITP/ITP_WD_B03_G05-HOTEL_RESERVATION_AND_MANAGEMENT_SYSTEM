const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
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


const tourModel = mongoose.model('tours' , tourSchema)

module.exports = tourModel