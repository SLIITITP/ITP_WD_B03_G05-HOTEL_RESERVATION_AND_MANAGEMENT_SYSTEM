/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Event({ event, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row ml-2 bs md-20">
      <div className="col-md-30">
        <img src={event.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{event.name}</h1>
        <b>
          {" "}
          <p>Rent per Day : {event.rentperday}</p>
          <p>Max Count : {event.maxcount}</p>{" "}
        </b>

        <div style={{ float: "right" }}>

        {fromdate && todate && (

            <Link to={`/bookevent/${event._id}/${fromdate}/${todate}`}>
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
          <Modal.Title>{event.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {event.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{event.description}</p>
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

export default Event;
