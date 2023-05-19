/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Tour from "../components/Tour";
import Loader from "../components/Loader";
import '@lottiefiles/lottie-player';



import "antd/dist/reset.css";
import moment from "moment";

import { DatePicker, Select, Space } from "antd";
const { RangePicker } = DatePicker;


function Homescreen() {
  let [loading, setloading] = useState();
  let [error, seterror] = useState();
  let [tours, settours] = useState([]);

  let [fromdate, setfromdate] = useState();
  let [todate, settodate] = useState();
  let [duplicatetours, setduplicatetours] = useState([]);

  let [searchkey , setsearchkey] = useState('')
  let [name , setname] = useState('all')

  useEffect(() => {
    async function getResults() {
      setloading(true);
      const data = (await axios("/api/tours/getalltours")).data;

      settours(data);
      setduplicatetours(data);
      setloading(false);

      console.log(data);
    }
    getResults();
  }, []);

  function filterByDate(dates) {
    const [from, to] = dates;
    setfromdate(from.format("DD-MM-YYYY"));
    settodate(to.format("DD-MM-YYYY"));

    var temptours = [];
    var availability = false;

    for (const tour of duplicatetours) {
      if (tour.currentbookings.length > 0) {
        for (const booking of tour.currentbookings) {
          if (
            !
              moment(from.format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
             &&
            !
              moment(from.format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            
          ) {
            if (
              from.format("DD-MM-YYYY") !== booking.fromdate &&
              from.format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }

        if (availability == true || tour.currentbookings.length==0)
        {
          temptours.push(tour)
        }
    }
    settours(temptours)
  }
   
  function filterBySearch(){

    const temptours = duplicatetours.filter(tour=> tour.name.toLowerCase().includes(searchkey.toLowerCase()))

    settours(temptours)

  }

  function filterByName(value) {
    setname(value);
  
    if (value !== "all") {
      const temptours = duplicatetours.filter(
        (tour) => tour.name.toLowerCase() === value.toLowerCase()
      );
      settours(temptours);
    } else {
      settours(duplicatetours);
    }
  }
  function handleLottieClick (){
    const homeMainContainer = document.getElementById("home-main-container");
    homeMainContainer.scrollIntoView({behavior: "smooth"});
  }

  function TourPageBanner() {
    return (
      <section
       class="img-fluid justify-content-center " className="w-auto p-3 hero-image_tour" 
        
      >
        <div className="text-muted">
          <h1 className="text-center hero-title" >TOURIST DESTINATIONS</h1>
          
          
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
   <><div> <TourPageBanner /> </div><div className="container" id="home-main-container">

      <div className="row mt-5 ">
        

        <div className="col-md-5 ">
          <input type="text" className="form-control" placeholder="Search Destination"
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value); } } onKeyUp={filterBySearch} />

        </div>

        
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          tours.map((tour) => {
            return (
              <div className="col-md-6 mt-2">
                <Tour tour={tour} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div></>
  );
}

export default Homescreen;
