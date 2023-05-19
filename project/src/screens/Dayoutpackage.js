import React, { useState, useEffect } from "react";
import axios from "axios";
import Dayout from "../components/Dayout";
import '@lottiefiles/lottie-player';

import "antd/dist/reset.css";
import moment from "moment";

import { DatePicker, Select, Space } from "antd";

const { RangePicker } = DatePicker;

function Homescreen() {
  let [dayouts, setdayouts] = useState([]);
  let [loading, setloading] = useState();
  let [error, seterror] = useState();

  // eslint-disable-next-line no-unused-vars
  let[fromdate , setfromdate] = useState();
  let[todate , settodate] = useState();

  let [duplicatedayouts, setduplicatedayouts] = useState([]);

  let [searchkey , setsearchkey] = useState('')
  let [name , setname] = useState('')

  useEffect(() => {
    async function getResults() {
      setloading(true);
      const data = (await axios.get("api/dayouts/getalldayouts")).data;
      setdayouts(data);
      setduplicatedayouts(data)
      console.log(data);
      setloading(false);
    }
    getResults();
  }, []);

  function filterByDate(dates) {


    setfromdate(moment(dates[0].toISOString()).format('DD-MM-YYYY'));
    settodate(moment(dates[1].toISOString()).format('DD-MM-YYYY'));

    const [from, to] = dates;
    setfromdate(from.format("DD-MM-YYYY"));
    settodate(to.format("DD-MM-YYYY"));

    var tempdayouts = [];
    var availability = false;

    for (const dayout of duplicatedayouts) {
      if (dayout.currentbookings.length > 0) {
        for (const booking of dayout.currentbookings) {
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

        if (availability == true || dayout.currentbookings.length==0)
        {
          tempdayouts.push(dayout)
        }
    }
    setdayouts(tempdayouts)
  }
   

    
  

  function filterBySearch(){

    const tempdayouts = duplicatedayouts.filter(dayout=> dayout.name.toLowerCase().includes(searchkey.toLowerCase()))

   setdayouts(tempdayouts)

  }

  function filterByName(e){

    setname(e)

    if(e!== 'all'){
  
    const tempdayouts = duplicatedayouts.filter(dayout=> dayout.name.toLowerCase() == e.toLowerCase())

    setdayouts(tempdayouts)
    }
    else{
      setdayouts(duplicatedayouts)
    }
  }

  function handleLottieClick (){
    const homeMainContainer = document.getElementById("home-main-container");
    homeMainContainer.scrollIntoView({behavior: "smooth"});
  }




  function PackagePageBanner() {
    return (
      <section
       class="img-fluid justify-content-center " className="w-auto p-3 hero-image1" 
        style={{ backgroundImage: `url(https://cdn.shopify.com/s/files/1/0955/6732/articles/evDIvm8snogHkoPxtE0cCJv3JHySKuA81631118019_1600x.jpg?v=1631235599)`   }}
      >
        <div className="text-muted">
          <h1 className="text-center hero-title" >Day Outing Packages</h1>

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
    <><div> <PackagePageBanner /> </div>
    <div className="container" id="home-main-container">
      <div className="row mt-5 ">
        <div className="col-md-3">

        <RangePicker  format="DD-MM-YYYY" onChange={filterByDate} />

        </div>
        <div className="col-md-7">

        <input type="text" className="form-control" placeholder="Search Dayout packages" 
            value={searchkey} onChange={(e) => {setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
            />
        </div>

        

      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1> Loading.... </h1>
        ) : error ? (
          <h1>Error..</h1>
        ) : (
          dayouts.map((dayout) => {
            return <div className="col-md-9 mt-2">
             <Dayout dayout={dayout} fromdate={fromdate} todate={todate} />
            </div>;
          
          })
        )}
      </div>
    </div></>
  );
}


export default Homescreen
