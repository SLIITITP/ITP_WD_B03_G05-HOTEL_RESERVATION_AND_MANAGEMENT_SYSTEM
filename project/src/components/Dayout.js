/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Dayout({ dayout, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row ml-1 bs mr-1 md-20">
      <div classname="col-md-30">
        <img src={dayout.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-30">
        <h1>{dayout.name}</h1>

        <b>
          {" "}
         
          <p><b><i>{dayout.description}</i></b></p>{" "}
        </b>

        <div style={{ float: "right" }}>

        {fromdate && todate && (
          <Link to={`/bookday/${dayout._id}/${fromdate}/${todate}`}> 

            <button className="btn btn-primary">Book Now </button>

          </Link>
        )}
          <button className="btn btn-primary" onClick={handleShow}>View Details</button>
         
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{dayout.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {dayout.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>

          <p><i>{dayout.description}</i></p>
          <p> Max Count :{dayout.maxcount}</p>
          <p>Rent per Day :{dayout.rentperday}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default Dayout;
