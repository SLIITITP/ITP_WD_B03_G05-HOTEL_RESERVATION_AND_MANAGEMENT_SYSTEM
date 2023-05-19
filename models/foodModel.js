const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    name : {
        type: String ,
        required : true
    },
    price : {
        type : Number ,
        required : true    
    },
    description :{
        type : String,
        required : true
    },
    imageurls : [],

   

} , {
    timestamps : true, 

} )


const foodModel = mongoose.model('foods' , foodSchema)

module.exports = foodModel