import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import Masonry from "react-masonry-css";

function ActivitiesList({ activities = "", authority = false }) {
  const awardTokens = (toAddress) => {
    console.log(toAddress);
  };
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleNewActivityFormSubmit = () => {};

  console.log("Activity", activities);
  return (
    <Masonry
      breakpointCols={2}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {activities !== ""
        ? activities.map((activity, index) => {
            const act = JSON.parse(activity);
            return (
              <Col key={index}>
                <Card>
                  <Card.Header>
                    <div className="p-4 d-flex justify-content-between align-items-start">
                      <div>
                        <div className="h4 text-muted">{act.username}</div>
                        <small className="text-muted font-italic">
                          Posted on {new Date(act.date).toLocaleString("en-US")}
                        </small>
                      </div>
                      <Button
                        variant={"dark"}
                        className="d-flex justify-content-center align-items-center"
                        onClick={() => awardTokens(act.walletid)}
                      >
                        {" "}
                        <img
                          src="https://ndma.gov.in/sites/default/files/emblem-dark.png"
                          alt=""
                          style={{
                            height: "1.5rem",
                            marginRight: ".5rem",
                          }}
                        />{" "}
                        Award Tokens
                      </Button>
                      <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Add Activity</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form
                            onSubmit={handleNewActivityFormSubmit}
                            id="activityForm"
                          >
                            <Form.Group className="mb-3">
                              <Form.Label>Activity Description</Form.Label>
                              <Form.Control
                                rows={3}
                                placeholder="Describe what the activity is about"
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleClose}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            form="activityForm"
                            disabled={isSubmitting}
                            type="submit"
                          >
                            {isSubmitting ? (
                              <Spinner animation="border" />
                            ) : (
                              "Post Activity"
                            )}
                          </Button>
                        </Modal.Footer>
                        <ToastContainer className="p-3" position="bottom-end">
                          <Toast
                            bg="success"
                            className="text-white"
                            onClose={() => {
                              setIsSuccess(false);
                              handleClose();
                            }}
                            show={isSuccess}
                            delay={3000}
                            autohide
                          >
                            <Toast.Header>
                              <Icon
                                icon="mdi:tick-circle-outline"
                                color="#408558"
                                className="mx-1"
                              />
                              <strong className="me-auto">Success!</strong>
                            </Toast.Header>
                            <Toast.Body>
                              Successfully posted new activity
                            </Toast.Body>
                          </Toast>
                        </ToastContainer>
                      </Modal>
                    </div>
                  </Card.Header>
                  <Card.Img
                    style={{ padding: "4rem" }}
                    variant="top"
                    src={act.imageLink}
                  />
                  <Card.Body>
                    <div>{act.description}</div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        : "No Activities Posted"}
    </Masonry>
  );
}

export default ActivitiesList;