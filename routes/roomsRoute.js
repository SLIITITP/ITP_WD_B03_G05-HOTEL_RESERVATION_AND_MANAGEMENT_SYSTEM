const express = require("express");
const router = express.Router();

const Room = require('../models/room')

//Create
router.post("/", async (req,res)=>{
   const newRoom=new Room(req.body)
   try{
       const savedRoom= await newRoom.save()
       res.status(200).json(savedRoom)

   }catch(err){
       res.status(500).json(err)
   }
})





router.get("/getallrooms", async(req, res) => {

   try{

    const rooms = await Room.find()
    res.send(rooms);

   } catch(error){
    return res.status(400).json({message : error});
   }

} );

router.post("/getroombyid", async(req, res) => {
 
   const roomid = req.body.roomid
   console.log(roomid)
   try{
    const room = await Room.findById(roomid)
    res.send(room);

   } catch(error){

    return res.status(400).json({message : error}); 
   }

} );




router.post("/addroom" , async (req,res) => {

    try {

        const newroom = new Room(req.body)
        await newroom.save()

        res.send('New Room Added Successfully')
        
    } catch (error) {

        return res.status(400).json({error});
        
    }

})

router.delete("/deleteroom/:roomid", async (req, res) => {

    const roomid = req.params.roomid
    console.log(roomid)

  try {
    const room = await Room.findByIdAndDelete(roomid);
    if (!room) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: `User ${room._id} has been removed.` });
  } catch (err) {
    res.status(500).json(err);
  }

})

//update
router.put("/updateroom/:roomid" , async (req,res,next)=>{
    try{
        console.log("fail")
        console.log(req.params.userid)
        const updateroom= await Room.findByIdAndUpdate(req.params.roomid, {$set:req.body}
            ,{new:true})
        res.status(200).json(updateroom);

    }catch(err){
        next(err);
    }
}
)

//get 

router.get("/get/:roomid" , async (req,res,next)=>{
    try{
        console.log(req.params.roomid)
        const viewRoom= await Room.findById(req.params.roomid);
        res.status(200).json(viewRoom);


    }catch(err){
        next(err);
    }
}
)
  
module.exports = router;