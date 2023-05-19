import './app.css'
import Navbar from './components/Navbar.jsx'



import {BrowserRouter ,Routes, Route , Link} from "react-router-dom";


import Homescreen from './screens/Homescreen';

import Dayoutpackage from './screens/Dayoutpackage';
import Homescreenimlka from './screens/HomescreenImalka';
import Bookingscreen1 from './screens/Bookingscreen1';

import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Updateroom from './screens/Updateroom';
import Updateprofile from './screens/Updateprofile';
import Adminscreen1 from './screens/Adminscreen1';
import Updatedayout from './screens/Updatedayout';
import Dinning from './screens/Dinning';
import Updatefood from './screens/Updatefood';
import Restaurant from './screens/Restaurant';
import Eventscreen from './screens/Eventscreen';
import Bookingscreenevent from './screens/Bookingscreenevent';
import Adminscreenevent from './screens/Adminscreenevent';
import Updateevent from './screens/Updateevent';
import Regevent from './screens/Regevent';
import TaxiscreenM from './screens/TaxiscreenM';
import Inventory from './screens/Invetory';
import Updateitems from './screens/Updateitems';
import BookingscreenM from './screens/BookingscreenM';
import Adminscreentour from './screens/AdminscreenImalka';
import Updatetour from './screens/UpdatetourImalka';
import AdminscreenM from './screens/AdminscreenM';
import UpdatetaxiM from './screens/UpdatetaxiM';
import Regtaxi from './screens/Regtaxi';
import NewHomeM from './screens/NewHomeM';






function App() {
  return (
    <div className="App"> <Navbar/>
     <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Homescreen />} />
            <Route path="/book/:id/:fromdate/:todate" element={<Bookingscreen/>} />
            <Route path="/day" element={<Dayoutpackage />} />
            <Route path="/bookday/:id/:fromdate/:todate" element={<Bookingscreen1/>} />
            <Route path="/login" element={<Loginscreen />} />
            <Route path="/register" element={<Registerscreen />} />
            <Route path="/profile" element={<Profilescreen />} />
            <Route path="/admin" element={<Adminscreen />} />
            <Route path="/adminday" element={<Adminscreen1 />} />
            <Route path="/updatedayout/:id" element={<Updatedayout/>} />
            <Route path="/updateroom/:id" element={<Updateroom/>} />
            <Route path="/updateuser/:id" element={<Updateprofile/>} />
            <Route path="/dinning" element={<Dinning />} />
            <Route path="/updatefoods/:id" element={<Updatefood/>} />
            <Route path="/restaurant" element={<Restaurant/>} />
            <Route path="/event" element={<Eventscreen />} />
            <Route path="/bookevent/:id/:fromdate/:todate" element={<Bookingscreenevent/>} />
            <Route path="/adminevent" element={<Adminscreenevent />} />
            <Route path="/updateevent/:id" element={<Updateevent/>} />
            <Route path="/regevent" element={<Regevent/>} />
            <Route path="/taxi" element={<TaxiscreenM />} />
            <Route path="/booktaxi/:id/:fromdate/:todate" element={<BookingscreenM/>} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/updateitems/:id" element={<Updateitems/>} />
           
            <Route path="/adminm" element={<AdminscreenM />} />
            <Route path="/updatetaxi/:id" element={<UpdatetaxiM/>} />
            <Route path="/regtaxi" element={<Regtaxi/>} />
            <Route path="/nhome" element={<NewHomeM/>} />
            <Route path="/tour" element={<Homescreenimlka />} />
            <Route path="/admintour" element={<Adminscreentour />} />
            <Route path="/updatetour/:id" element={<Updatetour/>} />

         
          </Routes>
      </BrowserRouter>
   
    </div>


   

  );
}


export default App;
