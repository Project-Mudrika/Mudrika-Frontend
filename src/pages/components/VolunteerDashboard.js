import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Modal,
  Form,
  Toast,
  Spinner,
  ToastContainer,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useStoreState } from "easy-peasy";
import axios from "axios";

import Image from "next/image";
import styles from "../../styles/Dashboard.module.scss";
import volunteerStyles from "../../styles/Volunteer.module.scss";
import { pinFileToIPFS } from "../../helpers/uploadIpfs";

function VolunteerDashboard() {
  const userDetails = useStoreState((state) => state.userData);
  const userData = userDetails.data[0];

  // Receive image from form
  const [activityUploadImage, setActivityUploadImage] = useState(null);
  const handleImageChange = (e) => {
    setActivityUploadImage(e.target.files[0]);
  };

  // Field lock on submitting
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Success state
  const [isSuccess, setIsSuccess] = useState(false);

  // Server submission data
  const [description, setDescription] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    // Get image link by uploading to IPFS
    const fileUrl = await pinFileToIPFS(activityUploadImage);
    console.log(fileUrl);

    // Construct the activity FormData object
    const formData = new FormData();
    formData.append("walletid", userDetails.walletId);
    formData.append("description", description);
    formData.append("date", new Date().toISOString());
    formData.append("imageLink", fileUrl);

    // Do something with the activity data and image file, such as send it to a server
    // Use formData instead of activity JSON object
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/volunteer/new-activity/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((err) => console.error(err));
    const data = await res?.data;
    console.log(data);

    // Reset the form
    event.target.reset();
    setDescription("");
    setActivityUploadImage(null);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Dashboard_content}>
        <Card bg="light" className={volunteerStyles.VolunteerDash}>
          <Card.Body>
            <div className={volunteerStyles.VolunteerHeader}>
              <img
                src={userData.profileimg}
                className={volunteerStyles.VolunteerImage}
              />
              <div className={volunteerStyles.VolunteerDetails}>
                <h2
                  className="h2"
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {userData.name}
                </h2>
                <h5
                  className="h5 text-muted"
                  style={{
                    margin: 0,
                  }}
                >
                  {userData.voltype}
                </h5>
                <h6
                  className="text-muted"
                  style={{
                    paddingTop: 8,
                  }}
                >
                  {userData.voltype == "organisation"
                    ? "Registered NGO / VO ID"
                    : "Volunteer Aadhar ID"}
                  : {userData.aadharngoid}
                </h6>
              </div>
              <div className={volunteerStyles.VolunteerContact}>
                <Button>Contact</Button>
              </div>
            </div>

            <h4 className={volunteerStyles.SectionHeading}>About Us</h4>
            <p className={volunteerStyles.about}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Provident, quasi dolorum cum architecto a fugiat dolor expedita
              minima quo nisi perferendis eos accusamus corrupti illum eligendi
              sequi, animi et inventore est cumque minus enim? Fugiat, ratione
              animi porro earum quia tempora sed natus, voluptas omnis qui
              assumenda nobis iure nisi!
            </p>

            <h4 className={volunteerStyles.SectionHeading}>Badges of Honour</h4>
            <div className={volunteerStyles.VolunteerBadges}>
              <div className={volunteerStyles.VolunteerBadge}>
                <Image
                  src="/Frame 35.png"
                  alt="badge"
                  layout="responsive"
                  width={50}
                  height={50}
                  objectFit="contain"
                />
              </div>
              <div className={volunteerStyles.VolunteerBadge}>
                <Image
                  src="/Frame 36.png"
                  alt="badge"
                  layout="responsive"
                  width={50}
                  height={50}
                  objectFit="contain"
                />
              </div>
              <div className={volunteerStyles.VolunteerBadge}>
                <Image
                  src="/Frame 37.png"
                  alt="badge"
                  layout="responsive"
                  width={50}
                  height={50}
                  objectFit="contain"
                />
              </div>
            </div>

            <h4 className={volunteerStyles.SectionHeading}>Activities</h4>
            <Button
              variant="primary"
              style={{ float: "right" }}
              onClick={handleShow}
            >
              Add Activity
            </Button>
            {/* Add Activity Modal */}
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Activity</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleFormSubmit} id="activityForm">
                  <Form.Group className="mb-3">
                    <Form.Label>Activity Description</Form.Label>
                    <Form.Control
                      disabled={isSubmitting}
                      as="textarea"
                      rows={3}
                      placeholder="Describe what the activity is about"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Activity Images</Form.Label>
                    <Form.Control
                      disabled={isSubmitting}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
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
                  <Toast.Body>Successfully posted new activity</Toast.Body>
                </Toast>
              </ToastContainer>
            </Modal>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default VolunteerDashboard;
