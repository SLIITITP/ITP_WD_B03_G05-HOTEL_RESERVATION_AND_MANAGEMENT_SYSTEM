/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";

import { Tabs } from "antd";
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h3 className="text-center">
        <b>Admin Panel</b>
      </h3>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Events" key="2">
          <Events />
        </TabPane>
        <TabPane tab="Add Event" key="3">
          <Addevent />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        {/* </TabPane>
        <TabPane tab="New Event Registrations" key="5">
        <Regevent /> */}
</TabPane>

      </Tabs>
    </div>
  );
}

export default Adminscreen;

//*****Display all the Bookings */

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (
          await axios.get("/api/bookingsevent/getallbookings")
        ).data;
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function deleteBooking(bookingid) {
    try {
      const response = await axios.delete(`/api/bookingsevent/deletebooking/${bookingid}`);
      const result = response.data;
  
      console.log(result);
  
      Swal.fire(
        "Congratulations!",
        "The Booking has been Removed",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
  
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }



  return (
    <div className="row">
      <div className="col-md-10">
        <h5>Bookings</h5>

        <table className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Event</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.event}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteBooking(booking._id);
                        }}
                      >
                        Remove
                      </button>
                      </td>

                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//*****Display all the Events */
export function Events() {
  const [events, setevents] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("/api/events/getallevents")).data;
        setevents(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function deleteEvent(eventid) {
    try {
      const result = await (
        await axios.delete(`/api/events/deleteevent/${eventid}`)
        
      ).data;
  
      console.log(result);
  
      Swal.fire(
        "Congratulations!",
        "Your Booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
  
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }
  
  return (
    <div className="row">
      <div className="col-md-10">
        <h5>Events</h5>
  
        <table className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
              {/* <th>Event Id</th> */}
              <th>Event Name</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Edit</th>
            </tr>
          </thead>
  
          <tbody>
            {events.length &&
              events.map((event) => {
                return (
                  <tr key={event._id}>
                    {/* <td>{event._id}</td> */}
                    <td>{event.name}</td>
                    <td>LKR {event.rentperday}</td>
                    <td>{event.maxcount}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteEvent(event._id);
                        }}
                      >
                        Delete Event
                      </button>
                      <Link to = {`/updateevent/${event._id}`}>
                      <button className="btn-success mr-1 mt-4">
                        Update event
                      </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
 }

//*****Display all the Users */
export function Users() {
  const [users, setusers] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("/api/users/getallusers")).data;
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function deleteUser(userid) {
    try {
      const response = await axios.delete(`/api/users/deleteuser/${userid}`);
      const result = response.data;
  
      console.log(result);
  
      Swal.fire(
        "Congratulations!",
        "Your Booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
  
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }
  

  return (
    <div className="row">
      <div className="col-md-10">
        <h5>Users</h5>

        <table className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>User NIC</th>
              <th>User Contact</th>
              <th>user Email</th>
              <th>Is Admin</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.nic}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Remove
                      </button>
                      </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//****Add event component*/

export function Addevent() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [imageurl1, setimageurl1] = useState("");
  const [imageurl2, setimageurl2] = useState("");
  const [imageurl3, setimageurl3] = useState("");

  async function addevent() {
    const newevent = {
      name,
      rentperday,
      maxcount,
      description,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      const result = await await axios.post("/api/events/addevent", newevent).data;

      console.log(result);
      Swal.fire(
        "Congratulations !",
        " event Added Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/home";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Ooops !", "Something went Wrong ", "error");
    }
  }
  
  

  return (
    <div>
      {" "}
      <h5>Add event</h5>
      <div className="row">
        <div className="col-md-5">
          <input
            typr="text"
            className="form-control"
            placeholder="event name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Rent Per Day 'LKR'"
            value={rentperday}
            onChange={(e) => {
              setrentperday(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Max Count"
            value={maxcount}
            onChange={(e) => {
              setmaxcount(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
        </div>

        <div className="col-md-5">
          <h6>Add Images</h6>
          <input
            typr="text"
            className="form-control"
            placeholder="Image URL 1"
            value={imageurl1}
            onChange={(e) => {
              setimageurl1(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Image URL 2"
            value={imageurl2}
            onChange={(e) => {
              setimageurl2(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Image URL 3"
            value={imageurl3}
            onChange={(e) => {
              setimageurl3(e.target.value);
            }}
          />

          <div className="text-right">
            <button className="btn btn-primary mt-2" onClick={addevent}>
              Add event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update event Componenet //


export function Regevent() {
  const [regevents, setRegevents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("/api/regevent/getallregevent");
      const data = response.data;
      setRegevents(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function deleteRegevent(userid) {
    try {
      const response = await axios.delete(`/api/regevent/deleteregevent/${userid}`);
      const result = response.data;
  
      console.log(result);
  
      Swal.fire(
        "Congratulations!",
        "Your Booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
  
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-10">
        <h5>New Registered Events</h5>

        <table className="table table-bordered table-dark">
          <thead className="thead-dark">
            <tr>
              <th>New Event Id</th>
              <th>Name</th>
              <th>NIC</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Vehicle No</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : regevents.length === 0 ? (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            ) : (
              regevents.map((regevent) => (
                <tr key={regevent._id}>
                  <td>{regevent._id}</td>
                  <td>{regevent.name}</td>
                  <td>{regevent.nic}</td>
                  <td>{regevent.phone}</td>
                  <td>{regevent.email}</td>
                  <td>{regevent.vrno}</td>
                  <td>
                    <button
                      className="btn-danger mt-1"
                      onClick={() => {
                        deleteRegevent(regevent._id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
