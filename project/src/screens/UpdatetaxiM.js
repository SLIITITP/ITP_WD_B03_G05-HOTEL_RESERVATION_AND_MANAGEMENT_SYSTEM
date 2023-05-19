import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatetaxiM = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [taxi, setTaxi] = useState({});

  useEffect(() => {
    const getOneTaxi = async () => {
      try {
        const response = await axios.get(`/api/taxis/get/${id}`);
        setTaxi(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOneTaxi();
  }, [id]);

  const { name, rentperday, maxcount, description } = taxi;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedTaxi = {
      name,
      rentperday,
      maxcount,
      description,
    };

    axios
      .put(`/api/taxis/updatetaxi/${id}`, updatedTaxi)
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
            navigate("/admin");
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
              <h4>Update Taxi</h4>
              <br />

              <b>Taxi Name :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={name}
                onChange={(e) => setTaxi({ ...taxi, name: e.target.value })}
              />

              <b>Rent per day :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={rentperday}
                onChange={(e) => setTaxi({ ...taxi, rentperday: e.target.value })}
              />

              <b>Max Count :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={maxcount}
                onChange={(e) => setTaxi({ ...taxi, maxcount: e.target.value })}
              />

              <b>Description :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={description}
                onChange={(e) => setTaxi({ ...taxi, description: e.target.value })}
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

export default UpdatetaxiM;