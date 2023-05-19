const express = require("express");
const router = express.Router();

const Dayout = require('../models/dayout')

//Create
router.post("/", async (req,res)=>{
   const newDayout=new Dayout(req.body)
   try{
       const savedDayout= await newDayout.save()
       res.status(200).json(savedDayout)

   }catch(err){
       res.status(500).json(err)
   }
})





router.get("/getalldayouts", async(req, res) => {

   try{

    const dayouts = await Dayout.find()
    res.send(dayouts);

   } catch(error){
    return res.status(400).json({message : error});
   }

} );

router.post("/getdayoutbyid", async(req, res) => {
 
   const dayoutid = req.body.dayoutid
   console.log(dayoutid)
   try{
    const dayout = await Dayout.findById(dayoutid)
    res.send(dayout);

   } catch(error){

    return res.status(400).json({message : error}); 
   }

} );




router.post("/adddayout" , async (req,res) => {

    try {

        const newdayout = new Dayout(req.body)
        await newdayout.save()

        res.send('New Dayout Added Successfully')
        
    } catch (error) {

        return res.status(400).json({error});
        
    }

})

router.delete("/deletedayout/:dayoutid", async (req, res) => {

    const dayoutid = req.params.dayoutid
    console.log(dayoutid)

  try {
    const dayout = await Dayout.findByIdAndDelete(dayoutid);
    if (!dayout) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: `User ${dayout._id} has been removed.` });
  } catch (err) {
    res.status(500).json(err);
  }

})

//update
router.put("/updatedayout/:dayoutid" , async (req,res,next)=>{
    try{
        console.log("fail")
        //console.log(req.params.userid)
        const updatedayout= await Dayout.findByIdAndUpdate(req.params.dayoutid, {$set:req.body}
            ,{new:true})
        res.status(200).json(updatedayout);

    }catch(err){
        next(err);
    }
}
)

//get 

router.get("/get/:dayoutid" , async (req,res,next)=>{
    try{
        console.log(req.params.dayoutid)
        const viewDayout= await Dayout.findById(req.params.dayoutid);
        res.status(200).json(viewDayout);


    }catch(err){
        next(err);
    }
}
)
  
module.exports = router;