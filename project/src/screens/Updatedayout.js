import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Updatedayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dayout, setDayout] = useState({});

  useEffect(() => {
    const getOneDayout = async () => {
      try {
        const response = await axios.get(`/api/dayouts/get/${id}`);
        setDayout(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOneDayout();
  }, [id]);

  const { name, rentperday, maxcount, description } = dayout;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedDayout = {
      name,
      rentperday,
      maxcount,
      description,
    };

    axios
      .put(`/api/dayouts/updatedayout/${id}`, updatedDayout)
      .then(() => {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            navigate("/adminday");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      })
      .catch((err) => Swal.fire("Not Updated", err.message, "error"));
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <form>
              <h4>Update Dayout</h4>
              <br />

              <b>Dayout Name :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={name}
                onChange={(e) => setDayout({ ...dayout, name: e.target.value })}
              />

              <b>Rent per day :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={rentperday}
                onChange={(e) => setDayout({ ...dayout, rentperday: e.target.value })}
              />

              <b>Max Count :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={maxcount}
                onChange={(e) => setDayout({ ...dayout, maxcount: e.target.value })}
              />

              <b>Description :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={description}
                onChange={(e) => setDayout({ ...dayout, description: e.target.value })}
              />

              <button className="btn btn-primary mt-3" type="submit" onClick={handleFormSubmit}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatedayout;