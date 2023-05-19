import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Updateevent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const getOneEvent = async () => {
      try {
        const response = await axios.get(`/api/events/get/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOneEvent();
  }, [id]);

  const { name, rentperday, maxcount, description } = event;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedEvent = {
      name,
      rentperday,
      maxcount,
      description,
    };

    axios
      .put(`/api/events/updateevent/${id}`, updatedEvent)
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
              <h4>Update Event</h4>
              <br />

              <b>Event Name :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={name}
                onChange={(e) => setEvent({ ...event, name: e.target.value })}
              />

              <b>Rent per day :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={rentperday}
                onChange={(e) => setEvent({ ...event, rentperday: e.target.value })}
              />

              <b>Max Count :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={maxcount}
                onChange={(e) => setEvent({ ...event, maxcount: e.target.value })}
              />

              <b>Description :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
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

export default Updateevent;