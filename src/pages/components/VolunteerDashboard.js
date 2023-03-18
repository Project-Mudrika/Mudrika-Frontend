import React from "react";
import { Button, Card } from "react-bootstrap";

import Image from "next/image";
import styles from "../../styles/Dashboard.module.scss";
import volunteerStyles from "../../styles/Volunteer.module.scss";
import { useStoreState } from "easy-peasy";

function VolunteerDashboard() {
  const volunteerDetails = useStoreState((state) => state.userData);
  const volunteerData = volunteerDetails.data[0];

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Dashboard_content}>
        <Card bg="light" className={volunteerStyles.VolunteerDash}>
          <Card.Body>
            <div className={volunteerStyles.VolunteerHeader}>
              <img
                src="https://gateway.pinata.cloud/ipfs/QmVBeCGpoRsvQNd8WFtbCwH72DBk3dbRYmyWS8ZfsLFomG"
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
                  {volunteerData?.name}
                </h2>
                <h5
                  className="h5 text-muted"
                  style={{
                    margin: 0,
                  }}
                >
                  {volunteerData?.voltype.charAt(0).toUpperCase() +
                    volunteerData?.voltype.slice(1)}
                </h5>
                <h6
                  className="text-muted"
                  style={{
                    paddingTop: 8,
                  }}
                >
                  {volunteerData?.aadharngoid}
                  {/* Registered NGO / VO ID: DL/1234/0000567 */}
                </h6>
              </div>
              <div className={volunteerStyles.VolunteerContact}>
                <Button>Contact</Button>
              </div>
            </div>

            <h4 className={volunteerStyles.SectionHeading}>About Us</h4>
            <p className={volunteerStyles.about}>
              {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Provident, quasi dolorum cum architecto a fugiat dolor expedita
              minima quo nisi perferendis eos accusamus corrupti illum eligendi
              sequi, animi et inventore est cumque minus enim? Fugiat, ratione
              animi porro earum quia tempora sed natus, voluptas omnis qui
              assumenda nobis iure nisi! */}
              {volunteerData?.about}
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
            <Button variant="primary" style={{ float: "right" }}>
              Add Activity
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default VolunteerDashboard;
