/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";

import { Tabs } from "antd";
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
const { TabPane } = Tabs;

function Dinning() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="invt mt-3 ml-3 mr-3 bs">
      <h3 className="invt text-center">
        <b>Dinning</b>
      </h3>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Foods" key="1">
          <Foods />
        </TabPane>
        <TabPane tab="Add Foods" key="2">
          <AddFood />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Dinning;

/*Display All Foods*/
export function Foods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/foods");
        setFoods(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Failed to fetch foods.");
      }
    };
    fetchData();
  }, []);

  async function deleteFood(id) {
    try {
      Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/foods/${id}`);
        setFoods(foods.filter((food) => food._id !== id));
        Swal.fire(
          "Deleted!",
          "Your food has been deleted.",
          "success"
        ).then((result) => {
         window.location.reload();
       });
      }
    });
  } catch (error) {
    console.log(error);
    Swal.fire("Ooops!", "Something went wrong", "error");
  }
}

  function handlePrint() {
    window.print();
  }

  return (
    <div className="invt row">
      <div className="invt col-md-10">
        <h5>Foods</h5>
        <input
          style={{ marginBottom: "10px" }}
          type="text"
          placeholder="Search by food name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handlePrint}>Print</button>

        <table className="invt table table-boardered table-dark">
          <thead className="invt thed-dark ">
            <tr>
              <th>Food Name</th>
              <th>Price</th>
              <th>Food Description</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {foods
              .filter((food) =>
                food.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((food) => {
                return (
                  <tr key={food._id}>
                    <td>{food.name}</td>
                    <td>LKR {food.price}.00</td>
                    <td>{food.description}</td>
                    <td>
                      <button
                        style={{ marginLeft: "10px" }}
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteFood(food._id);
                        }}
                      >
                        Delete Food
                      </button>
                      <Link to={`/updatefoods/${food._id}`}>
                        <button
                          style={{ marginLeft: "10px" }}
                          className="btn-success mt-4"
                        >
                          Update Food
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

/*add food component*/
export function AddFood() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl1, setImageUrl1] = useState("");
  const [imageurl2, setImageUrl2] = useState("");

  async function addFood() {
    if (!name || !price || !description || !imageurl1 || !imageurl2) {
      Swal.fire("Please fill in all fields", "", "warning");
      return;
    }

    if (isNaN(price) || +price <= 0) {
      Swal.fire("Please enter a valid price", "", "warning");
      return;
    }

    const newFood = {
      name,
      price,
      description,
      imageurls: [imageurl1, imageurl2],
    };

    try {
      const result = await axios.post("/api/foods", newFood);
      console.log(result.data);
      Swal.fire(
        "Congratulations!",
        "Food Added Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/dinning";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }

  return (
    <div>
      <h5>Add Food</h5>
      <div className="invt row">
        <div className="invt col-md-5">
        <label style={{marginTop:"10px"}} htmlFor="name">Food Name:</label>
          <input
            type="text"
            className="invt form-control"
            placeholder="Food name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label style={{marginTop:"10px"}} htmlFor="price">Price:</label>
          <input
            type="text"
            className="invt form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          
          <label style={{marginTop:"10px"}} htmlFor="description">Description:</label>
            <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ height: "200px", border: "2px solid black" }}
            />
        
        </div>
        <div className="col-md-5">
          <h6>Add Images</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Image URL 1"
            value={imageurl1}
            onChange={(e) => {
              setImageUrl1(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image URL 2"
            value={imageurl2}
            onChange={(e) => {
              setImageUrl2(e.target.value);
            }}
          />
          <div className="text-right">
            <button className="btn btn-primary mt-2" onClick={addFood}>
              Add Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
