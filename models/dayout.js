const mongoose = require("mongoose");

const dayoutSchema = mongoose.Schema({
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


const dayoutModel = mongoose.model('dayouts' , dayoutSchema)

module.exports = dayoutModel