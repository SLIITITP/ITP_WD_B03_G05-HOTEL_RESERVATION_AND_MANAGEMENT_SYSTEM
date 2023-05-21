/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Event from "../components/Event";
import Loader from "../components/Loader";
import '@lottiefiles/lottie-player';



import "antd/dist/reset.css";
import moment from "moment";

import { DatePicker, Select, Space } from "antd";
const { RangePicker } = DatePicker;

//homescreen View
function Homescreen() {
  let [loading, setloading] = useState();
  let [error, seterror] = useState();
  let [events, setevents] = useState([]);

  let [fromdate, setfromdate] = useState();
  let [todate, settodate] = useState();
  let [duplicateevents, setduplicateevents] = useState([]);

  let [searchkey , setsearchkey] = useState('')
  let [name , setname] = useState('all')

  useEffect(() => {
    async function getResults() {
      setloading(true);
      const data = (await axios("/api/events/getallevents")).data;

      setevents(data);
      setduplicateevents(data);
      setloading(false);

      console.log(data);
    }
    getResults();
  }, []);

  function filterByDate(dates) {
    const [from, to] = dates;
    setfromdate(from.format("DD-MM-YYYY"));
    settodate(to.format("DD-MM-YYYY"));

    var tempevents = [];
    var availability = false;

    for (const event of duplicateevents) {
      if (event.currentbookings.length > 0) {
        for (const booking of event.currentbookings) {
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

        if (availability === true || event.currentbookings.length===0)
        {
          tempevents.push(event)
        }
    }
    setevents(tempevents)
  }
   
  function filterBySearch(){

    const tempevents = duplicateevents.filter(event=> event.name.toLowerCase().includes(searchkey.toLowerCase()))

    setevents(tempevents)

  }

  function filterByName(value) {
    setname(value);
  
    if (value !== "all") {
      const tempevents = duplicateevents.filter(
        (event) => event.name.toLowerCase() === value.toLowerCase()
      );
      setevents(tempevents);
    } else {
      setevents(duplicateevents);
    }
  }
  function handleLottieClick (){
    const homeMainContainer = document.getElementById("home-main-container");
    homeMainContainer.scrollIntoView({behavior: "smooth"});
  }

  function EventPageBanner() {
    return (
      <section
       class="img-fluid justify-content-center " className="w-auto p-3 hero-image_event" 
        
      >

        <div className="text-muted">
          <h1 className="text-center hero-title" >EVENT</h1>
          
          <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_klsab29v.json"
          background="transparent"
          speed="1"
          style={{ width: '60px', height: '60px', margin: 'auto' }}
          loop
          autoplay
          onClick={handleLottieClick}
          
        >
          
        </lottie-player>
        



          
        </div>
      </section>
    );
  }
  
  return (
   <><div> <EventPageBanner /> </div><div className="container" id="home-main-container">

      <div className="row mt-5 ">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5 ">
          <input type="text" className="form-control" placeholder="Search Events"
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value); } } onKeyUp={filterBySearch} />

        </div>

        <div className="col-md-3">
          <select className="form-control" value={name} onChange={(e) => filterByName(e.target.value)}>
            <option value="all">All</option>
            <option value="weddings">Weddings</option>
            <option value="birthdayparties">Birthday Parties</option>
            <option value="businessmeetings">Business Meetings</option>
            <option value="gettogetherparties">Get Together Parties</option>
            

          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          events.map((event) => {
            return (
              <div className="col-md-6 mt-2">
                <Event event={event} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div></>
  );
}

export default Homescreen;
