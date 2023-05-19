import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const Updateprofile = () => {

  const navigate = useNavigate();
  const id = useParams().id;
  const [user, setuser] = useState([]);
  

  useEffect(() => {
      const getOneUser = () => {
          axios.get(`/api/users/get/${id}`).then((res) => {
              setuser(res.data)
              console.log(user)
          }).catch((err) => {
              console.log(err.message);
          })
      }
      getOneUser();
  }, [id])

  const[name , setusername] = useState(user.name)
  const[nic , setnic] = useState(user.nic)
  const[phone , setphone] = useState(user.phone)
  const[email , setemail] = useState(user.email)
  const[password , setpassword] = useState(user.password)

  const handleChanges = (event) => {
      const {name , value} = event.target.value;
      setuser((preUser) =>({
          ...preUser,
          [name] : value,
      }))

      console.log(user);
  };

  const updateUser = {
    name,
    nic,
    phone,
    email,
    password
    

  };

  const handleFormSubmit = (event) =>{
      event.preventDefault();

      axios.
          put(`/api/users/updateuser/${id}`,updateUser)
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
                  navigate("/home")
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
            })
            .catch((err) => Swal.fire("Not Updated", err.message, "error"));
  };
  return (
    <div>
      
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
        
        <div className="bs">
            <form >
            <h4>My profile</h4>
            <br />

            <b>Name : </b>
            <input
            type="text"
            className="form-control"
            defaultValue={user.name}
            onChange={(e) => setusername(e.target.value)}
          />
            <b>NIC : </b>
            <input
            type="text"
            className="form-control"
            defaultValue={user.nic}
            onChange={(e) => setnic(e.target.value)}
          />
            <b>Contact Number: </b>
            <input
            type="text"
            className="form-control"
            defaultValue={user.phone}
            onChange={(e) => setphone(e.target.value)}
          />
            <b>Email : </b>
            <input
            type="text"
            className="form-control"
            defaultValue={user.email}
            onChange={(e) => setemail(e.target.value)}
          />
            <b>password: </b>
            <input
            type="text"
            className="form-control"
            defaultValue={user.password}
            onChange={(e) => setpassword(e.target.value)}
          />

              <button className='btn btn-primary mt-3' type='submit' onClick={handleFormSubmit}>
                Update
              </button>
           
              </form>
          </div>
         
        </div>
      </div>
    </div>
  )
 
};

export default Updateprofile;
