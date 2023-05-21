/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";

import { Tabs } from "antd";
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
const { TabPane } = Tabs;
//function Admin Screen
function AdminscreenM() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/taxi";
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
        <TabPane tab="Taxis" key="2">
          <Taxis />
        </TabPane>
        <TabPane tab="Add Taxi" key="3">
          <Addtaxi />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
        <TabPane tab="New Taxi Registrations" key="5">
        <Regtaxi />
</TabPane>

      </Tabs>
    </div>
  );
}

export default AdminscreenM;

//*****Display all the Bookings */

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (
          await axios.get("/api/bookings/getallbookings")
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
      const response = await axios.delete(`/api/bookings/deletebooking/${bookingid}`);
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
              
              <th>Taxi</th>
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
                    
                
                    <td>{booking.taxi}</td>
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

//*****Display all the Taxis */
export function Taxis() {
  const [taxis, settaxis] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("/api/taxis/getalltaxis")).data;
        settaxis(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);
//Delete Taxi
  async function deleteTaxi(taxiid) {
    try {
      const result = await (
        await axios.delete(`/api/taxis/deletetaxi/${taxiid}`)
        
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
        <h5>Taxis</h5>
  
        <table className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
            
              <th>Taxi Name</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Edit</th>
            </tr>
          </thead>
  
          <tbody>
            {taxis.length &&
              taxis.map((taxi) => {
                return (
                  <tr key={taxi._id}>
                    
                    <td>{taxi.name}</td>
                    <td>{taxi.rentperday}</td>
                    <td>{taxi.maxcount}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteTaxi(taxi._id);
                        }}
                      >
                        Delete Taxi
                      </button>
                      <Link to = {`/updatetaxi/${taxi._id}`}>
                      <button className="btn-success mr-1 mt-4">
                        Update taxi
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

//****Add taxi component*/

export function Addtaxi() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [imageurl1, setimageurl1] = useState("");
  const [imageurl2, setimageurl2] = useState("");
  const [imageurl3, setimageurl3] = useState("");

  async function addtaxi() {
    const newtaxi = {
      name,
      rentperday,
      maxcount,
      description,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      const result = await await axios.post("/api/taxis/addtaxi", newtaxi).data;

      console.log(result);
      Swal.fire(
        "Congratulations !",
        " taxi Added Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/taxi";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Ooops !", "Something went Wrong ", "error");
    }
  }
  
  

  return (
    <div>
      {" "}
      <h5>Add taxi</h5>
      <div className="row">
        <div className="col-md-5">
          <input
            typr="text"
            className="form-control"
            placeholder="taxi name"
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
            <button className="btn btn-primary mt-2" onClick={addtaxi}>
              Add taxi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update taxi Componenet //


export function Regtaxi() {
  const [regtaxis, setRegtaxis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("/api/regtaxi/getallregtaxi");
      const data = response.data;
      setRegtaxis(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function deleteRegtaxi(userid) {
    try {
      const response = await axios.delete(`/api/regtaxi/deleteregtaxi/${userid}`);
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
        <h5>New Registered Taxis</h5>

        <table className="table table-bordered table-dark">
          <thead className="thead-dark">
            <tr>
              
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
            ) : regtaxis.length === 0 ? (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            ) : (
              regtaxis.map((regtaxi) => (
                <tr key={regtaxi._id}>
                
                  <td>{regtaxi.name}</td>
                  <td>{regtaxi.nic}</td>
                  <td>{regtaxi.phone}</td>
                  <td>{regtaxi.email}</td>
                  <td>{regtaxi.vrno}</td>
                  <td>
                    <button
                      className="btn-danger mt-1"
                      onClick={() => {
                        deleteRegtaxi(regtaxi._id);
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
