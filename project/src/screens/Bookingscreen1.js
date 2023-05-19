/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import StripeCheckout from "react-stripe-checkout";

import Swal from "sweetalert2";

function Bookingscreen1() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dayout, setDayout] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const { id } = useParams();
  const { fromdate } = useParams();
  const { todate } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("currentUser")) {
        window.location.reload = "/login";
      }

      try {
        setLoading(true);
        const data = (
          await axios.post("/api/dayouts/getdayoutbyid", {
            dayoutid: id,
          })
        ).data;
        setDayout(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
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
    if (dayout) {
      let amount = totalDays * dayout.rentperday;

      setTotalAmount(amount);
    }
  }, [dayout, totalDays]);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      dayout,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount,
      totalDays,
      token,
    };

    try {
      setLoading(true);
      const result = await axios.post(
        "/api/bookingsd/bookdayout",
        bookingDetails
      );

      setLoading(false);
      Swal.fire(
        "Congratulations !",
        "Your Package is reserved Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/day";
      });
    } catch (error) {
      setLoading(false);
      Swal.fire("Ooops !", "Something went Wrong ", "error");
    }
  }

  function handlePrint(){
    window.print();
  }

  return (
    <div className="m-5">
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1>{dayout.name}</h1>
              <img src={dayout.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-5">
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
                    {dayout.maxcount}
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
                    {dayout.rentperday}
                  </p>
                  <p>
                    <b>Total Amount: </b> {totalAmount}
                  </p>
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
        </div>
      )}
    </div>
  );
}

export default Bookingscreen1;
