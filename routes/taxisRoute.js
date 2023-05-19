const express = require("express");
const router = express.Router();

const Taxi = require('../models/taxi')

//Create
router.post("/", async (req,res)=>{
   const newTaxi=new Taxi(req.body)
   try{
       const savedTaxi= await newTaxi.save()
       res.status(200).json(savedTaxi)

   }catch(err){
       res.status(500).json(err)
   }
})





router.get("/getalltaxis", async(req, res) => {

   try{

    const taxis = await Taxi.find()
    res.send(taxis);

   } catch(error){
    return res.status(400).json({message : error});
   }

} );

router.post("/gettaxibyid", async(req, res) => {
 
   const taxiid = req.body.taxiid
   console.log(taxiid)
   try{
    const taxi = await Taxi.findById(taxiid)
    res.send(taxi);

   } catch(error){

    return res.status(400).json({message : error}); 
   }

} );




router.post("/addtaxi" , async (req,res) => {

    try {

        const newtaxi = new Taxi(req.body)
        await newtaxi.save()

        res.send('New Taxi Added Successfully')
        
    } catch (error) {

        return res.status(400).json({error});
        
    }

})

router.delete("/deletetaxi/:taxiid", async (req, res) => {

    const taxiid = req.params.taxiid
    console.log(taxiid)

  try {
    const taxi = await Taxi.findByIdAndDelete(taxiid);
    if (!taxi) {
      return res.status(404).json({ error: 'Regtaxi not found' });
    }
    res.status(200).json({ message: `Regtaxi ${taxi._id} has been removed.` });
  } catch (err) {
    res.status(500).json(err);
  }

})

//update
router.put("/updatetaxi/:taxiid" , async (req,res,next)=>{
    try{
        console.log("fail")
        console.log(req.params.userid)
        const updatetaxi= await Taxi.findByIdAndUpdate(req.params.taxiid, {$set:req.body}
            ,{new:true})
        res.status(200).json(updatetaxi);

    }catch(err){
        next(err);
    }
}
)

//get 

router.get("/get/:taxiid" , async (req,res,next)=>{
    try{
        console.log(req.params.taxiid)
        const viewTaxi= await Taxi.findById(req.params.taxiid);
        res.status(200).json(viewTaxi);


    }catch(err){
        next(err);
    }
}
)
  
module.exports = router;