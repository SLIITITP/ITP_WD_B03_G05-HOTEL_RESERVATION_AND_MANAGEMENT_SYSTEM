/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Taxi({ taxi, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row ml-2 bs md-20">
      <div className="col-md-30">
        <img src={taxi.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{taxi.name}</h1>
        <b>
          {" "}
          <p>Rent per Day : {taxi.rentperday}</p>
          <p>Max Count : {taxi.maxcount}</p>{" "}
        </b>

        <div style={{ float: "right" }}>

        {fromdate && todate && (

            <Link to={`/book/${taxi._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary mr-2">Book Now</button>
            </Link>
        )}
         

          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{taxi.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {taxi.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{taxi.description}</p>
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

export default Taxi;
