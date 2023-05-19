const express=require("express");

const app=express();

const roomsRoute = require('./routes/roomsRoute')
const dayoutsRoute = require('./routes/dayoutsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')
const bookingsRouteday = require('./routes/bookingsRouteday')
const foodsRoute = require('./routes/foods')
const eventsRoute = require('./routes/eventsRoute')
const bookingsRouteevent = require('./routes/bookingsRouteevent')
const regeventRoute = require('./routes/regeventRoute')
const taxisRoute = require('./routes/taxisRoute')

const bookingsRoutetaxi = require('./routes/bookingsRoutetaxi')
const regtaxiRoute = require('./routes/regtaxiRoute')
const itemRoutes = require('./routes/items')
const toursRoute = require('./routes/toursRoute')




app.use(express.json())

app.use('/api/rooms' , roomsRoute)
app.use('/api/dayouts' , dayoutsRoute)
app.use('/api/users' , usersRoute)
app.use('/api/bookings' , bookingsRoute)
app.use('/api/bookingsd' , bookingsRouteday)
app.use('/api/foods' , foodsRoute)
app.use('/api/events' , eventsRoute)
app.use('/api/bookingsevent' , bookingsRouteevent)
app.use('/api/regevent' , regeventRoute)
app.use('/api/taxis' , taxisRoute)

app.use('/api/bookingstaxi' , bookingsRoutetaxi)
app.use('/api/regtaxi' , regtaxiRoute)
app.use('/api/items',itemRoutes)
app.use('/api/tours' , toursRoute)




const mongoose =require("mongoose")

const dotenv=require("dotenv");
require("dotenv").config();


//connect database
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to mongodb")
      } catch (error) {
        throw error 
      }
}

mongoose.connection.on("disconnected", ()=>{
  console.log("mongoDB disconnected")
});



const PORT = 5001;


app.listen(PORT,()=>{
    connect()
    console.log(`node server started using nodemon`)

}); 





