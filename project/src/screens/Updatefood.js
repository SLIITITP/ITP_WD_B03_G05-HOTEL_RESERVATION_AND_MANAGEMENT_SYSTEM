import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateFood() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const { data } = await axios.get(`/api/foods/${id}`);
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
      } catch (error) {
        console.log(error);
        Swal.fire("Ooops!", "Failed to fetch the food.", "error");
      }
    };
    fetchFood();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Show Swal fire confirmation dialog
    Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update the food details?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, proceed with update
          performUpdate();
        }
      });
    };
  
    const performUpdate = async () => {
      try {
        await axios.patch(`/api/foods/${id}`, {name, price, description });
        Swal.fire(
          "Congratulations!",
          "Your Food has been updated",
          "success"
        ).then((result) => {
          window.location.href = "/dinning";
        });
      } catch (error) {
        console.log(error);
        Swal.fire("Ooops!", "Something went wrong", "error");
      }
    };
  

  return (
    <div className="invt col-md-6 offset-md-3">
      <h3 className="invt text-center">Update Food</h3>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <button type="submit" className="btn-success mt-4">
          Update Food
        </button>
      </form>
    </div>
  );
}

export default UpdateFood;
