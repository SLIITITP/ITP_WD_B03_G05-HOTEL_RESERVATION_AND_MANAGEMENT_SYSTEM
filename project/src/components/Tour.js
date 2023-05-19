import React, { useState, useRef } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";

function Tour({ tour, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const ref = useRef();

  const handleShow = () => setShow(true);

  return (
    <div className="row ml-2 bs md-20">
      <div className="col-md=4">
        <img src={tour.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-30">
        <h1>{tour.name}</h1>
        <b>
          {" "}
          <p>Distance From Hotel : {tour.rentperday}</p>
          <p>Time of Travel : {tour.maxcount}</p>{" "}
        </b>

        <div style={{ float: "right" }}>
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{tour.name}</Modal.Title>
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-primary my-2 mx-1 my-sm-0">
                Download as a PDF
              </button>
            )}
            content={() => ref.current}
          />
        </Modal.Header>

        <Modal.Body ref={ref}>
          <Carousel prevLabel="" nextLabel="">
            {tour.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{tour.description}</p>
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

export default Tour;
