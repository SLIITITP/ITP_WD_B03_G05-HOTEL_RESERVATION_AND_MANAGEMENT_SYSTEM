const express = require('express')
const {
    createFood,
    getFoods,
    getFood,
    deleteFood,
    updateFood
}= require('../controllers/foodController')


const router =express.Router()

//Get all foods
router.get('/', getFoods)

//Get a single Food
router.get('/:id', getFood)

//Post a new Food
router.post('/', createFood)

//Delete a Food
router.delete('/:id', deleteFood)

//Update a Food
router.patch('/:id', updateFood)


module.exports = router