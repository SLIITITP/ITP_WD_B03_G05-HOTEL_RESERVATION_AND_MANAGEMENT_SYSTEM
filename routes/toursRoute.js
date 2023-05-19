const express = require("express");
const router = express.Router();

const Tour = require('../models/tour')

//Create
router.post("/", async (req,res)=>{
   const newTour=new Tour(req.body)
   try{
       const savedTour= await newTour.save()
       res.status(200).json(savedTour)

   }catch(err){
       res.status(500).json(err)
   }
})





router.get("/getalltours", async(req, res) => {

   try{

    const tours = await Tour.find()
    res.send(tours);

   } catch(error){
    return res.status(400).json({message : error});
   }

} );

router.post("/gettourbyid", async(req, res) => {
 
   const tourid = req.body.tourid
   console.log(tourid)
   try{
    const tour = await Tour.findById(tourid)
    res.send(tour);

   } catch(error){

    return res.status(400).json({message : error}); 
   }

} );




router.post("/addtour" , async (req,res) => {

    try {

        const newtour = new Tour(req.body)
        await newtour.save()

        res.send('New Tour Added Successfully')
        
    } catch (error) {

        return res.status(400).json({error});
        
    }

})

router.delete("/deletetour/:tourid", async (req, res) => {

    const tourid = req.params.tourid
    console.log(tourid)

  try {
    const tour = await Tour.findByIdAndDelete(tourid);
    if (!tour) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: `User ${tour._id} has been removed.` });
  } catch (err) {
    res.status(500).json(err);
  }

})

//update
router.put("/updatetour/:tourid" , async (req,res,next)=>{
    try{
        console.log("fail")
        console.log(req.params.userid)
        const updatetour= await Tour.findByIdAndUpdate(req.params.tourid, {$set:req.body}
            ,{new:true})
        res.status(200).json(updatetour);

    }catch(err){
        next(err);
    }
}
)

//get 

router.get("/get/:tourid" , async (req,res,next)=>{
    try{
        console.log(req.params.tourid)
        const viewTour= await Tour.findById(req.params.tourid);
        res.status(200).json(viewTour);


    }catch(err){
        next(err);
    }
}
)
  
module.exports = router;