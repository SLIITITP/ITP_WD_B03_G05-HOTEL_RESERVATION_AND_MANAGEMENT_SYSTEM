/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Food from "../components/Food";
import Loader from "../components/Loader";
import '@lottiefiles/lottie-player';



import "antd/dist/reset.css";
import moment from "moment";

import { DatePicker, Select, Space } from "antd";
const { RangePicker } = DatePicker;


function Homescreen() {
  let [loading, setloading] = useState();
  let [error, seterror] = useState();
  let [foods, setfoods] = useState([]);

  let [fromdate, setfromdate] = useState();
  let [todate, settodate] = useState();
  let [duplicatefoods, setduplicatefoods] = useState([]);

  let [searchkey , setsearchkey] = useState('')
  let [name , setname] = useState('all')

  useEffect(() => {
    async function getResults() {
      setloading(true);
      const data = (await axios("/api/foods")).data;

      setfoods(data);
      setduplicatefoods(data);
      setloading(false);

      console.log(data);
    }
    getResults();
  }, []);

  function filterByDate(dates) {
    const [from, to] = dates;
    setfromdate(from.format("DD-MM-YYYY"));
    settodate(to.format("DD-MM-YYYY"));

    var tempfoods = [];
    var availability = false;

    for (const food of duplicatefoods) {
      if (food.currentbookings.length > 0) {
        for (const booking of food.currentbookings) {
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

        if (availability == true || food.currentbookings.length==0)
        {
          tempfoods.push(food)
        }
    }
    setfoods(tempfoods)
  }
   
  function filterBySearch(){

    const tempfoods = duplicatefoods.filter(food=> food.name.toLowerCase().includes(searchkey.toLowerCase()))

    setfoods(tempfoods)

  }

  function filterByName(value) {
    setname(value);
  
    if (value !== "all") {
      const tempfoods = duplicatefoods.filter(
        (food) => food.name.toLowerCase() === value.toLowerCase()
      );
      setfoods(tempfoods);
    } else {
      setfoods(duplicatefoods);
    }
  }
  function handleLottieClick (){
    const homeMainContainer = document.getElementById("home-main-container");
    homeMainContainer.scrollIntoView({behavior: "smooth"});
  }

  function FoodPageBanner() {
    return (
      <section className="w-auto p-3 hero-image_yash" 
        
      >
        <div className="text-muted">
          <h1 className="text-center hero-title" >EXPLORE GREATER TASTES</h1>
          
          
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
   <><div> <FoodPageBanner /> </div><div className="container" id="home-main-container">

      <div className="row mt-5 ">
        

        <div className="col-md-5 ">
          <input type="text" className="form-control" placeholder="Search Food"
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value); } } onKeyUp={filterBySearch} />

        </div>

        
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          foods.map((food) => {
            return (
              <div className="col-md-6 mt-2">
                <Food food={food} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div></>
  );
}

export default Homescreen;
