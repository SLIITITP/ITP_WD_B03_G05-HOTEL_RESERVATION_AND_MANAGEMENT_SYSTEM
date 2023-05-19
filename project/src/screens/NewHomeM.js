/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Taxi from "../components/Taxi";
import Loader from "../components/Loader";
import '@lottiefiles/lottie-player';



import "antd/dist/reset.css";
import moment from "moment";

import { DatePicker, Select, Space } from "antd";
function NewHomeM(){
    let [loading, setloading] = useState();
  let [error, seterror] = useState();
  let [taxis, settaxis] = useState([]);

  let [fromdate, setfromdate] = useState();
  let [todate, settodate] = useState();
  let [duplicatetaxis, setduplicatetaxis] = useState([]);

  let [searchkey , setsearchkey] = useState('')
  let [name , setname] = useState('all')
  function filterBySearch(){

    const temptaxis = duplicatetaxis.filter(taxi=> taxi.name.toLowerCase().includes(searchkey.toLowerCase()))

    settaxis(temptaxis)

  }

function handleLottieClick (){
    const homeMainContainer = document.getElementById("home-main-container");
    homeMainContainer.scrollIntoView({behavior: "smooth"});
  }

  function TaxiPageBanner() {
    return (
      <section
       class="img-fluid justify-content-center " className="w-auto p-3 hero-image_home" 
        
      >
        <div className="text-muted">
          
          
          
          <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_klsab29v.json"
          background="transparent"
          speed="1"
          style={{ width: '60px', height: '60px', margin: 'auto' }}
          loop
          autoplay
          onClick={handleLottieClick}
        ></lottie-player>
       

          
        </div>
      </section>
    );
  }

  return (
    <><div> <TaxiPageBanner /> </div><div className="container" id="home-main-container">
 
       <div className="row mt-5 ">
         
 
         <h1>About Us</h1>
         <h5>The Dylan bungalow is established in 1998 and located in Bandarawela town. It’s providing accommodation for local travellers and foreign taxiists. This bungalow wished to improve its features and services by using the most recent technology, as well as market themselves more effectively than their competitors. 
This hotel offers these services,
<br></br>
<ul>
<li>Rooms with all amenities.</li>  
<li>High standard customer service.</li>  
<li>A restaurant that provides delicious meals for reasonable price.</li>  
<li>A perfect place for all type of occasions with a pool.</li>  
<li>Special offers and packages.</li>  
<li>Taxi and rent car service.</li>  
<li>Day out guide service for travellers</li>  
</ul>

<h1>Contact Us</h1>
<h5>The Dylan bungalow is established in 1998 and located in Bandarawela town. It’s providing accommodation for local travellers and foreign taxiists. This bungalow wished to improve its features and services by using the most recent technology, as well as market themselves more effectively than their competitors. 
This hotel offers these servicesThe Dylan bungalow is established in 1998 and located in Bandarawela town. It’s providing accommodation for local travellers and foreign taxiists. This bungalow wished to improve its features and services by using the most recent technology, as well as market themselves more effectively than their competitors. 
This hotel offers these servicesThe Dylan bungalow is established in 1998 and located in Bandarawela town. It’s providing accommodation for local travellers and foreign taxiists. This bungalow wished to improve its features and services by using the most recent technology, as well as market themselves more effectively than their competitors. 
This hotel offers these servicesThe Dylan bungalow is established in 1998 and located in Bandarawela town. It’s providing accommodation for local travellers and foreign taxiists. This bungalow wished to improve its features and services by using the most recent technology, as well as market themselves more effectively than their competitors. 
This hotel offers these servicesThe Dylan bungalow is established in 1998 and located in Bandarawela town. It’s providing accommodation for local travellers and foreign taxiists. This bungalow wished to improve its features and services by using the most recent technology, as well as market themselves more effectively than their competitors. 
This hotel offers these servicesThe Dylan bungalow is established in 1998 and located in Bandarawela town. It’s providing accommodation for local travellers and foreign taxiists. This bungalow wished to improve its features and services by using the most recent technology, as well as market themselves more effectively than their competitors. 
This hotel offers these services</h5>

</h5>
 
         
       </div>
 
       <div className="row justify-content-center mt-5">
         {loading ? (
           <h1>Loading...</h1>
         ) : (
           taxis.map((taxi) => {
             return (
               <div className="col-md-6 mt-2">
                 <Taxi taxi={taxi} fromdate={fromdate} todate={todate} />
               </div>
             );
           })
         )}
       </div>
     </div></>
   );
        }
 
 export default NewHomeM;