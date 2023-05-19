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
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
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
      const response = await axios.delete(
        `/api/bookings/deletebooking/${bookingid}`
      );
      const result = response.data;

      console.log(result);

      Swal.fire("The Booking has been Removed Successfully !!!").then(
        (result) => {
          window.location.reload();
        }
      );
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
              <th>User name</th>
              <th>User Id</th>
              <th>Room</th>
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
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        className=" btn-danger mt-1"
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

//*****Display all the Rooms */
export function Rooms() {
  const [rooms, setrooms] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function deleteRoom(roomid) {
    try {
      const response = await axios.delete(`/api/rooms/deleteroom/${roomid}`);
      const result = response.data;

      console.log(result);

      Swal.fire("The Room has been Removed Successfully !!!").then((result) => {
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
        <h5>Rooms</h5>

        <table className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
              <th>Room Id</th>
              <th>Room Name</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteRoom(room._id);
                        }}
                      >
                        Delete Room
                      </button>

                      <Link to={`/updateroom/${room._id}`}>
                        <button className="btn-success mt-4">
                          Update Room
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

      Swal.fire("The User has been Removed Successfully !!!").then((result) => {
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

//****Add Room component*/

export function Addroom() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [imageurl1, setimageurl1] = useState("");
  const [imageurl2, setimageurl2] = useState("");
  const [imageurl3, setimageurl3] = useState("");

  async function addRoom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      const result = await await axios.post("/api/rooms/addroom", newroom).data;

      console.log(result);
      Swal.fire(
        "Congratulations !",
        " Room Added Successfully",
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
      <h5>Add Room</h5>
      <div className="row">
        <div className="col-md-5">
          <input
            typr="text"
            className="form-control"
            placeholder="room name"
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
            <button className="btn btn-primary mt-2" onClick={addRoom}>
              Add Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update Room Componenet //
