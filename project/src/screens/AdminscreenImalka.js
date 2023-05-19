/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import ReactPrint from "react-to-print"

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
        
        <TabPane tab="Destinations" key="2">
          <Tours />
        </TabPane>
        <TabPane tab="Add Destination" key="3">
          <Addtour />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;


//*****Display all the tours */
export function Tours() {
  const [rentperday, setDistance] = useState('');
  const [tours, settours] = useState([]);
  const ref = useRef();
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("/api/tours/getalltours")).data;
        settours(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };

    fetchData();
    

  }, []);

  async function deleteTour(tourid) {
    try {
      const result = await (
        await axios.delete(`/api/tours/deletetour/${tourid}`)
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
        <h5>Destinations</h5>
  
        <table ref={ref} className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
              <th>Destination Name</th>
              <th>Distance</th>
              <th>Time</th>
              <th>Edit</th>
            </tr>
          </thead>
  
          <tbody>
            {tours.length &&
              tours.map((tour) => {
                return (
                  <tr key={tour._id}>
                   
                    <td>{tour.name}</td>
                    <td>{tour.rentperday}</td>
                    <td>{tour.maxcount}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteTour(tour._id);
                        }}
                      >
                        Delete Destination
                      </button>
                      <Link to={`/updatetour/${tour._id}`}>
                        <button className="btn-success mr-1 mt-4">
                          Update Destination
                        </button>
                      </Link>
                     
                    </td>
                  </tr>
                );
              })}
          </tbody>

        </table>
        <ReactPrint trigger={() => <button className="btn btn-primary my-2 mx-1 my-sm-0">Print</button>} content={() => ref.current} />

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

//****Add tour component*/

export function Addtour() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [imageurl1, setimageurl1] = useState("");
  const [imageurl2, setimageurl2] = useState("");
  const [imageurl3, setimageurl3] = useState("");
  
  
  const distanceex = /^\d{3}[a-zA-Z]{2}\d{7}$/;
  const [error, setError] = useState('');
  async function addTour() {
    
    
    const newtour = {
      name,
      rentperday,
      maxcount,
      description,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      const result = await await axios.post("/api/tours/addtour", newtour).data;

      console.log(result);
      Swal.fire(
        "Congratulations !",
        " Destination Added Successfully",
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
      <h5>Add Destination</h5>
      <div className="row">
        <div className="col-md-5">
          <input
            typr="text"
            className="form-control"
            placeholder="Destination Name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Distanace From Hotel"
            value={rentperday}
            onChange={(e) => {
              setrentperday(e.target.value);
              if (!distanceex.test(rentperday)) {
                setError('Name must contain only alphabetic characters');
                return;
              }
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Time "
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
            <button className="btn btn-primary mt-2" onClick={addTour}>
              Add Destination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update Tour Componenet //



