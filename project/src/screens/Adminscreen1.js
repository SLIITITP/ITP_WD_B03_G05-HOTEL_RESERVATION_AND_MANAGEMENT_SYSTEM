/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import {Link , useParams} from "react-router-dom"

import { Tabs } from "antd";
const { TabPane } = Tabs;

function Adminscreen1() { //setting a function for the dayouting packages admin panal
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/day";
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
        <TabPane tab="Packages" key="2">
          <Dayouts/>
        </TabPane>
        <TabPane tab="Add Packages" key="3">
          <Adddayout />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen1;

//*****Display all the Bookings */

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (
          await axios.get("/api/bookingsd/getallbookings")
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
      const response = await axios.delete(`/api/bookingsd/deletebooking/${bookingid}`);
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
              <th>dayout</th>
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
                    <td>{booking.dayout}</td>
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

//*****Display all the dayouts */
export function Dayouts() {
  const [dayouts, setdayouts] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("/api/dayouts/getalldayouts")).data;
        setdayouts(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function deleteDayout(dayoutid) {   //setting a function to delete the bookings
    try {
      const response = await axios.delete(`/api/dayouts/deletedayout/${dayoutid}`);
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
        <h5>Packages</h5>

        <table className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
              <th>Dayout Id</th>
              <th>Package Name</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {dayouts.length &&
              dayouts.map((dayout) => {
                return (
                  <tr key={dayout._id}>
                    <td>{dayout._id}</td>
                    <td>{dayout.name}</td>
                    <td>{dayout.rentperday}</td>
                    <td>{dayout.maxcount}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteDayout(dayout._id);
                        }}
                      >
                        Delete dayout
                      </button>
                        <Link to = {`/updatedayout/${dayout._id}`}>
                          <button className="btn-success mt-4">
                            Update Package
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
        "The User has been Removed",
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

//****Add Dayout component*/

export function Adddayout() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [imageurl1, setimageurl1] = useState("");
  const [imageurl2, setimageurl2] = useState("");
  const [imageurl3, setimageurl3] = useState("");

  async function addDayout() {
    const newdayout = {
      name,
      rentperday,
      maxcount,
      description,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      const result = await await axios.post("/api/dayouts/adddayout", newdayout).data;

      console.log(result);
      Swal.fire(
        "Congratulations !",
        " Dayout Package Added Successfully",
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
      <h5>Add Dayout Package</h5>
      <div className="row">
        <div className="col-md-5">
          <input
            typr="text"
            className="form-control"
            placeholder="dayout name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Rent Per Day"
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
            <button className="btn btn-primary mt-2" onClick={addDayout}>
              Add Dayout package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
