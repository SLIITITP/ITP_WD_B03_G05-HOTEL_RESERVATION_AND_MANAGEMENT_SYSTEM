const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register" , async(req, res) => {

    const newuser = new User(req.body)
    
    try {
        const user = await newuser.save()
        res.send('User Registered Successfully')


    } catch (error) {
        return res.status(400).json({ error});
        
    }

});

router.post("/login" , async(req, res) => {

    const {email , password} = req.body

    try {
        const user = await User.findOne({email : email , password : password})
        if(user){

            const temp = {
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id,
            }
            res.send(user)
        }
        else{
            return res.status(400).json({message : 'Login failed'})
        }
        
    } catch (error) {
        return res.status(400).json({ error});
        
    }

});

router.get("/getallusers", async (req , res) => {

    try {
        const users = await User.find()
        res.send(users)

    } catch (error) {

        return res.status(400).json({error});
        
    }
})


router.delete("/deleteuser/:userid", async (req, res) => {

    const userid = req.params.userid
    console.log(userid)

  try {
    const user = await User.findByIdAndDelete(userid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: `User ${user._id} has been removed.` });
  } catch (err) {
    res.status(500).json(err);
  }

})

router.get("/get/:userid" , async (req,res,next)=>{
    try{
        console.log(req.params.userid)
        const viewUser= await User.findById(req.params.userid);
        res.status(200).json(viewUser);


    }catch(err){
        next(err);
    }
}
)


router.put("/updateuser/:userid" , async (req,res,next)=>{
    try{
        console.log("fail")
        console.log(req.params.userid)
        const updateuser= await User.findByIdAndUpdate(req.params.userid, {$set:req.body}
            ,{new:true})
        res.status(200).json(updateuser);

    }catch(err){
        next(err);
    }
}
)

router.post("/getuserbyid", async (req, res) => {
    const userid = req.body.userid;
  
    try {
      const users = await User.find({ userid: userid });
      res.send(users);
    } catch (error) {
      return res.status(400).json({ error });
    }
  });
  




module.exports = router;

