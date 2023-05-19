/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import '@lottiefiles/lottie-player';



import "antd/dist/reset.css";
import moment from "moment";

import { DatePicker, Select, Space } from "antd";
const { RangePicker } = DatePicker;


function Homescreen() {
  let [loading, setloading] = useState();
  let [error, seterror] = useState();
  let [rooms, setrooms] = useState([]);

  let [fromdate, setfromdate] = useState();
  let [todate, settodate] = useState();
  let [duplicaterooms, setduplicaterooms] = useState([]);

  let [searchkey , setsearchkey] = useState('')
  let [name , setname] = useState('all')

  useEffect(() => {
    async function getResults() {
      setloading(true);
      const data = (await axios("/api/rooms/getallrooms")).data;

      setrooms(data);
      setduplicaterooms(data);
      setloading(false);

      console.log(data);
    }
    getResults();
  }, []);

  function filterByDate(dates) {
    
    const [from, to] = dates;
    setfromdate(from.format("DD-MM-YYYY"));
    settodate(to.format("DD-MM-YYYY"));

    var temprooms = [];
    var availability = false;

    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
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

        if (availability == true || room.currentbookings.length==0)
        {
          temprooms.push(room)
        }
    }
    setrooms(temprooms)
  }
   
  function filterBySearch(){

    const temprooms = duplicaterooms.filter(room=> room.name.toLowerCase().includes(searchkey.toLowerCase()))

    setrooms(temprooms)

  }

  function filterByName(value) {
    setname(value);
  
    if (value !== "all") {
      const temprooms = duplicaterooms.filter(
        (room) => room.name.toLowerCase() === value.toLowerCase()
      );
      setrooms(temprooms);
    } else {
      setrooms(duplicaterooms);
    }
  }
  function handleLottieClick (){
    const homeMainContainer = document.getElementById("home-main-container");
    homeMainContainer.scrollIntoView({behavior: "smooth"});
  }

  function RoomPageBanner() {
    return (
      <section
       class="img-fluid justify-content-center " className="w-auto p-3 hero-image" 
        
      >
        <div className="text-muted">
          <h1 className="text-center hero-title" >ACCOMANDATION</h1>
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
   <><div> <RoomPageBanner /> </div><div className="container" id="home-main-container">

      <div className="row mt-5">
  <div className="col-md-3">
    <RangePicker
      format="DD-MM-YYYY"
      onChange={filterByDate}
      defaultValue={[moment(), moment()]} // Set default value to current date range
      disabledDate={(current) => current && current < moment().startOf('day')} // Disable dates prior to the current date
    />
  </div>

        <div className="col-md-5 ">
          <input type="text" className="form-control" placeholder="Search Rooms"
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value); } } onKeyUp={filterBySearch} />

        </div>

        <div className="col-md-3">
          <select className="form-control" value={name} onChange={(e) => filterByName(e.target.value)}>
            <option value="all">All</option>
            <option value="luxury">Luxury</option>
            <option value="familyroom">Family Room</option>
            <option value="doubleroom">Double Room</option>
            <option value="deluxdoubleroom">Deluxe Double Room</option>
            <option value="familybungalow">Family Bungalow</option>

          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-6 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div></>
  );
}

export default Homescreen;
