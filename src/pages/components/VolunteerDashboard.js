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
import TokenHelper from "../../helpers/TokenHelper";
import ActivitiesList from "./ActivitiesList";

function VolunteerDashboard() {
  const userDetails = useStoreState((state) => state.userData);
  const userData = userDetails.data[0];

  // Token Handler
  const tokenHelper = new TokenHelper();
  const [tokenBalance, setTokenBalance] = useState(0);
  useEffect(async () => {
    const balance = await tokenHelper.fetchBalance();
    setTokenBalance(balance);
  }, []);

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

  const handleNewActivityFormSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    // Get image link by uploading to IPFS
    const fileUrl = await pinFileToIPFS(activityUploadImage);
    console.log(fileUrl);

    // Construct the activity FormData object
    const formData = new FormData();
    console.log("user details:", userDetails);
    formData.append("walletid", userDetails.walletId);
    formData.append("username", userData.name);
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

    // Reset the form
    event.target.reset();
    setDescription("");
    setActivityUploadImage(null);
    setIsSubmitting(false);
    setIsSuccess(true);

    // Refetch activities
    fetchActivities();
  };
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Fetch Volunteer Activities on load
  const [activities, setActivities] = useState([]);
  const fetchActivities = async () => {
    const res = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/volunteer/fetch-activities/`,
        {
          responseType: "json",
          params: {
            walletId: userDetails.walletId,
          },
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((err) => console.error(err));
    const data = await res?.data;
    console.log(data);
    setActivities(data.data[0].activities);
  };
  useEffect(fetchActivities, []);

  const addMudrikaToken = async (e) => {
    e.preventDefault();
    const tokenAddress = "0x6CF40C7AE3bad60cdF1e89F82417EdB6b54b9E0C";
    const tokenSymbol = "MDK";
    const tokenDecimals = 18;
    const tokenImage =
      "https://ndma.gov.in/sites/default/files/emblem-dark.png";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Added MDK succesfully!");
      } else {
        console.log("Failed Adding MDK!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <div style={{ width: 10 }}></div>
              <div className={volunteerStyles.VolunteerContact}>
                {tokenBalance < 1 ? (
                  <Button onClick={addMudrikaToken}>Add MDK to Metamask</Button>
                ) : null}
              </div>
            </div>

            <h4 className={volunteerStyles.SectionHeading}>About Us</h4>
            <p className={volunteerStyles.about}>
              Our organization is dedicated to providing relief and aid to
              communities affected by disasters. We believe that in times of
              crisis, every person has the power to make a difference. That's
              why we work tirelessly to recruit and train volunteers from all
              walks of life to respond to disasters of all kinds. Whether it's a
              natural disaster like a hurricane or wildfire, or a human-made
              crisis like a mass shooting or terrorist attack, our volunteers
              stand ready to provide support and assistance to those in need.
              From search and rescue operations to setting up emergency
              shelters, our volunteers play a critical role in helping affected
              communities recover and rebuild.
            </p>

            <h4 className={volunteerStyles.SectionHeading}>
              Mudrika Tokens Earned :{" "}
              <img
                src="https://ndma.gov.in/sites/default/files/emblem-dark.png"
                alt=""
                style={{
                  height: "2rem",
                }}
              />{" "}
              {tokenBalance} MDK
            </h4>
            <div className={volunteerStyles.VolunteerBadges}></div>

            <div className="d-flex items-center justify-content-between w-100 mb-3">
              <h4 className={volunteerStyles.SectionHeading}>Activities</h4>
              <Button
                variant="primary"
                style={{ float: "right" }}
                onClick={handleShow}
              >
                Add Activity
              </Button>
            </div>
            {/* Add New Activity Modal */}
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Activity</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleNewActivityFormSubmit} id="activityForm">
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
            <ActivitiesList activities={activities} />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default VolunteerDashboard;
