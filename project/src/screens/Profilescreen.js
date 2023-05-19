/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

import ReactToPrint from "react-to-print";

import { Divider, Space, Tag } from "antd";

import { Tabs } from "antd";
import { Link } from "react-router-dom";
const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/users/getuserbyid/${user._id}`);

        setBookings(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user._id]);

  return (
    <div className="ml-3 mt-3 ">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <div className="bs">
            <h4>My profile</h4>
            <br />

            <h6>
              <b>Name : </b>
              {user.name}
            </h6>
            <h6>
              <b>NIC : </b>
              {user.nic}
            </h6>
            <h6>
              <b>Contact Number : </b>
              {user.phone}
            </h6>
            <h6>
              <b>Email : </b>
              {user.email}
            </h6>
            <h6>
              <b>isAdmin : </b>
              {user.isAdmin ? "Yes" : "No"}
            </h6>
            <div className="text-right">
              <Link to={`/updateuser/${user._id}`}>
                <button className="btn-success mt-4">Update profile</button>
              </Link>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        });
        setBookings(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred.</div>;
  }

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })
      ).data;

      console.log(result);
      setLoading(false);
      Swal.fire(
        "Congratulations !",
        "Your Booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Ooops !", "Something went Wrong ", "error");
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="row">
      <div className="col-md-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="bs">
            <h6>
              <b>{booking.room}</b>
            </h6>
            <h6>
              <b>Booking Id : </b>
              {booking._id}
            </h6>
            <h6>
              <b>Room Type : </b>
              {booking.room}
            </h6>
            <h6>
              <b>Total Days : </b>
              {booking.totalDays}
            </h6>
            <h6>
              <b>Check In : </b>
              {booking.fromdate}
            </h6>
            <h6>
              <b>Check Out : </b>
              {booking.todate}
            </h6>
            <h6>
              <b>Amount : </b>
              {booking.totalAmount}
            </h6>
            <h6>
              <b>Status : </b>
              {booking.status == "cancelled" ? (
                <Tag color="red">Cancelled</Tag>
              ) : (
                <Tag color="green">Confirmed</Tag>
              )}
            </h6>

            {booking.status !== "cancelled" && (
              <div className="text-right">
                <button
                  class="btn btn-primary"
                  onClick={() => {
                    cancelBooking(booking._id, booking.roomid);
                  }}
                >
                  Cancel Booking
                </button>
                <div className="row justify-content-center mt-5"></div>
                <button onClick={handlePrint}>Print</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
