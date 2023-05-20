/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Taxi from "../components/Taxi";
import Loader from "../components/Loader";
import '@lottiefiles/lottie-player';



import "antd/dist/reset.css";
import moment from "moment";

import { DatePicker, Select, Space } from "antd";
const { RangePicker } = DatePicker;


function HomescreenM() {
  let [loading, setloading] = useState();
  let [error, seterror] = useState();
  let [taxis, settaxis] = useState([]);

  let [fromdate, setfromdate] = useState();
  let [todate, settodate] = useState();
  let [duplicatetaxis, setduplicatetaxis] = useState([]);

  let [searchkey , setsearchkey] = useState('')
  let [name , setname] = useState('all')

  useEffect(() => {
    async function getResults() {
      setloading(true);
      const data = (await axios("/api/taxis/getalltaxis")).data;

      settaxis(data);
      setduplicatetaxis(data);
      setloading(false);

      console.log(data);
    }
    getResults();
  }, []);

  function filterByDate(dates) {
    const [from, to] = dates;
    setfromdate(from.format("DD-MM-YYYY"));
    settodate(to.format("DD-MM-YYYY"));

    var temptaxis = [];
    var availability = false;

    for (const taxi of duplicatetaxis) {
      if (taxi.currentbookings.length > 0) {
        for (const booking of taxi.currentbookings) {
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

        if (availability == true || taxi.currentbookings.length==0)
        {
          temptaxis.push(taxi)
        }
    }
    settaxis(temptaxis)
  }
   
  function filterBySearch(){

    const temptaxis = duplicatetaxis.filter(taxi=> taxi.name.toLowerCase().includes(searchkey.toLowerCase()))

    settaxis(temptaxis)

  }

  function filterByName(value) {
    setname(value);
  
    if (value !== "all") {
      const temptaxis = duplicatetaxis.filter(
        (taxi) => taxi.name.toLowerCase() === value.toLowerCase()
      );
      settaxis(temptaxis);
    } else {
      settaxis(duplicatetaxis);
    }
  }
  function handleLottieClick (){
    const homeMainContainer = document.getElementById("home-main-container");
    homeMainContainer.scrollIntoView({behavior: "smooth"});
  }

  function TaxiPageBanner() {
    return (
      <section
       class="img-fluid justify-content-center " className="w-auto p-3 hero-image_taxi" 
        
      >

        <div className="text-muted">
          <h1 className="text-center hero-title" >TAXI SERVICES</h1>
          
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
        
<div>
<p className="pn1">Do You Want To Earn With Us?</p>

<button className="btnM">
           <a href="/regtaxi"> Become a driver</a>
          </button>
          </div>


          
        </div>
      </section>
    );
  }
  
  return (
   <><div> <TaxiPageBanner /> </div><div className="container" id="home-main-container">

      <div className="row mt-5 ">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5 ">
          <input type="text" className="form-control" placeholder="Search Taxis"
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value); } } onKeyUp={filterBySearch} />

        </div>

        <div className="col-md-3">
          <select className="form-control" value={name} onChange={(e) => filterByName(e.target.value)}>
            <option value="all">All</option>
            <option value="vans">Vans</option>
            <option value="cars">Cars</option>
            <option value="jeeps">Jeeps</option>
            <option value="other">Others</option>
            

          </select>
        </div>
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

export default HomescreenM;
