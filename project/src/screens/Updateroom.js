import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Updateroom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState({});

  useEffect(() => {
    const getOneRoom = async () => {
      try {
        const response = await axios.get(`/api/rooms/get/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOneRoom();
  }, [id]);

  const { name, rentperday, maxcount, description } = room;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedRoom = {
      name,
      rentperday,
      maxcount,
      description,
    };

    axios
      .put(`/api/rooms/updateroom/${id}`, updatedRoom)
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
              <h4>Update Room</h4>
              <br />

              <b>Room Name :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={name}
                onChange={(e) => setRoom({ ...room, name: e.target.value })}
              />

              <b>Rent per day :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={rentperday}
                onChange={(e) => setRoom({ ...room, rentperday: e.target.value })}
              />

              <b>Max Count :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={maxcount}
                onChange={(e) => setRoom({ ...room, maxcount: e.target.value })}
              />

              <b>Description :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={description}
                onChange={(e) => setRoom({ ...room, description: e.target.value })}
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

export default Updateroom;
