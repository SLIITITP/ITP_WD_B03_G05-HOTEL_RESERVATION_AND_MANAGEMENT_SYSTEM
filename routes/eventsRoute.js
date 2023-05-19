const express = require("express");
const router = express.Router();

const Event = require('../models/event')

//Create
router.post("/", async (req,res)=>{
   const newEvent=new Event(req.body)
   try{
       const savedEvent= await newEvent.save()
       res.status(200).json(savedEvent)

   }catch(err){
       res.status(500).json(err)
   }
})





router.get("/getallevents", async(req, res) => {

   try{

    const events = await Event.find()
    res.send(events);

   } catch(error){
    return res.status(400).json({message : error});
   }

} );

router.post("/geteventbyid", async(req, res) => {
 
   const eventid = req.body.eventid
   console.log(eventid)
   try{
    const event = await Event.findById(eventid)
    res.send(event);

   } catch(error){

    return res.status(400).json({message : error}); 
   }

} );




router.post("/addevent" , async (req,res) => {

    try {

        const newevent = new Event(req.body)
        await newevent.save()

        res.send('New Event Added Successfully')
        
    } catch (error) {

        return res.status(400).json({error});
        
    }

})

router.delete("/deleteevent/:eventid", async (req, res) => {

    const eventid = req.params.eventid
    console.log(eventid)

  try {
    const event = await Event.findByIdAndDelete(eventid);
    if (!event) {
      return res.status(404).json({ error: 'Regevent not found' });
    }
    res.status(200).json({ message: `Regevent ${event._id} has been removed.` });
  } catch (err) {
    res.status(500).json(err);
  }

})

//update
router.put("/updateevent/:eventid" , async (req,res,next)=>{
    try{
        console.log("fail")
        console.log(req.params.userid)
        const updateevent= await Event.findByIdAndUpdate(req.params.eventid, {$set:req.body}
            ,{new:true})
        res.status(200).json(updateevent);

    }catch(err){
        next(err);
    }
}
)

//get 

router.get("/get/:eventid" , async (req,res,next)=>{
    try{
        console.log(req.params.eventid)
        const viewEvent= await Event.findById(req.params.eventid);
        res.status(200).json(viewEvent);


    }catch(err){
        next(err);
    }
}
)
  
module.exports = router;