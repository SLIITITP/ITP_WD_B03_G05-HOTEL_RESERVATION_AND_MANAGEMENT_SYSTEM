const Food = require('../models/foodModel')
const mongoose = require('mongoose')

//get all foods
const getFoods = async(req, res)=>{
    const foods = await Food.find({}).sort({createdAt: -1})

    res.status(200).json(foods)
}


//get a single food
const getFood = async(req, res)=> {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such food"})
    }

    const food = await Food.findById(id)

    if(!food){
        return res.status(404).json({error: "No Such food"})
    }

    res.status(200).json(food)
}


//create new food
const createFood = async (req, res)=>{
    const {name, price, description, imageurls} = req.body

    //add doc to db
    try{
        const food= await Food.create({name, price, description, imageurls})
        res.status(200).json(food)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a food
const deleteFood = async(req, res)=> {
    const{id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such food"})
    }

    const food = await Food.findOneAndDelete({_id: id})

    if(!food){
        return res.status(400).json({error: "No Such food"})
    }

    res.status(200).json(food)

}


//update a food
const updateFood = async(req, res)=>{
    const{id}= req.params

    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such food"})
    }

    const food = await Food.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!food){
        return res.status(400).json({error: "No Such food"})
    }

    res.status(200).json(food)
}

module.exports= {
    getFoods,
    getFood,
    createFood,
    deleteFood,
    updateFood
} 