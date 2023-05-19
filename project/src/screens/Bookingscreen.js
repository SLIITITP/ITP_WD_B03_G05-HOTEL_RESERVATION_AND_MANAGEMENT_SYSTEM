/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

import StripeCheckout from "react-stripe-checkout";

import Swal from "sweetalert2";

function Bookingscreen() {
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();
  let [room, setroom] = useState();
  let [totalDays, setTotalDays] = useState(0);
  let [totalAmount, setToatalAmount] = useState(0);
  const [copm, setComp] = useState([]);

  let { id } = useParams();
  let { fromdate } = useParams();
  let { todate } = useParams();

  useEffect(() => {
    const fetchData = async () => {

      if(!localStorage.getItem('currentUser')){
        window.location.reload = '/login'
      }

      try {
        setloading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: id })
        ).data;

        setroom(data);
        setloading(false);
        console.log(data);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    let fromDate = moment(fromdate, "DD-MM-YYYY");
    let toDate = moment(todate, "DD-MM-YYYY");
    let days = toDate.diff(fromDate, "days");
    setTotalDays(days + 1);
  }, [fromdate, todate]);

  useEffect(() => {
    if (room) {
      let amount = totalDays * room.rentperday;

      setToatalAmount(amount);
    }
  }, [room, totalDays]);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount,
      totalDays,
      token,
    };

    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);

      setloading(false);
      Swal.fire(
        "Congratulations !",
        "Your Room is reserved Successfully",
        "success"
      ).then(result => {
        window.location.href='/home'
        
      })
    } catch (error) {
      setloading(false);
      Swal.fire("Ooops !", "Something went Wrong ", "error");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred.</div>;
  }

  if (!room) {
    return null;
  }

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />{" "}
        </h1>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-5 ">
              <div>
                <h3 style={{ textAlign: "center" }}>
                  <b>Booking details </b>
                </h3>
                <hr />
                <div style={{ textAlign: "right" }}>
                  <p>
                    <b>Name : </b>{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>
                  <b>NIC : </b>{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).nic}
                  </p>
                  <p>
                  <b>Contact Number : </b>{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).phone}
                  </p>
                  <p>
                    <b>Check In : </b>
                    {fromdate}
                  </p>
                  <p>
                    <b>Check out : </b>
                    {todate}
                  </p>
                  <p>
                    <b>Max Count : </b>
                    {room.maxcount}
                  </p>
                </div>
              </div>

              <div>
                <h3 style={{ textAlign: "center" }}>
                  <b>Amount</b>
                </h3>
                <hr />
                <div style={{ textAlign: "right" }}>
                  <p>
                    <b>Total days: </b>
                    {totalDays}
                  </p>
                  <p>
                    <b>Rent per day :</b>
                    {room.rentperday}
                  </p>
                  <p>
                    <b>Total Amount: </b> {totalAmount}
                  </p>
                </div>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalAmount * 100}
                  token={onToken}
                  currency="LKR"
                  stripeKey="pk_test_51Mw0Y3GaX4dMd9Ph5FFdbJJQW6ukPYnjcFIpliD85djOTZwUNeW6nyO5mu42ycR8SBuhG3C9XDRnYCBVRL9t2JpY00uXxvj6pQ"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
