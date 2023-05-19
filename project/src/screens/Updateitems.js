import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateItem() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [quanty, setQuanty] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await axios.get(`/api/items/${id}`);
      setTitle(data.title);
      setQuanty(data.quanty);
      setValue(data.value);
    };
    fetchItem();
  }, [id]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(`/api/items/${id}`);
        setTitle(data.title);
        setQuanty(data.quanty);
        setValue(data.value);
      } catch (error) {
        console.log(error);
        Swal.fire("Ooops!", "Failed to fetch the item.", "error");
      }
    };
    fetchItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Show Swal fire confirmation dialog
    Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update the report details?",
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
        await axios.patch(`/api/items/${id}`, { title, quanty, value});
        Swal.fire(
          "Congratulations!",
          "Your Report has been updated",
          "success"
        ).then((result) => {
          window.location.href = "/inventory";
        });
      } catch (error) {
        console.log(error);
        Swal.fire("Ooops!", "Something went wrong", "error");
      }
    };
  

  return (
    <div className="invt col-md-6 offset-md-3">
      <h3 className="invt text-center">Update Item</h3>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quanty">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quanty"
            value={quanty}
            onChange={(e) => setQuanty(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input
            type="number"
            className="form-control"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-success mt-4">
          Update Item
        </button>
      </form>
    </div>
  );
}

export default UpdateItem;
