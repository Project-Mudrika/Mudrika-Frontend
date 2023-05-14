import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../../styles/Profile.module.scss";
import { Form, Container, Row, Col } from "react-bootstrap";

function UserDetails() {
    const loaderProfile = {
        district: "loading...",
        fname: "loading...",
        level: "loading...",
        lname: "loading...",
        state: "loading...",
        walletid: "loading...",
    };

    const [profile, setProfile] = useState(loaderProfile);

    const capitalize = (s) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const walletId = urlSearchParams.get('walletId');
        console.log(walletId);
        axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/fetch-user-data/?walletId=` + walletId)
            .then(res => {
                const profile_data = res.data.data[0];
                profile_data.walletId = walletId;
                setProfile(profile_data);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    return (
        <div className={styles.Profile}>
            <h4>User Profile</h4>

            <Form style={{ width: "60%" }}>
                <Container className="my-2 mx-0 p-0">
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Wallet ID</Form.Label>
                                <Form.Control
                                    readOnly
                                    value={profile.walletid}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            {" "}
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    readOnly
                                    value={capitalize(profile.fname) ?? "Sudev"}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            {" "}
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    readOnly
                                    value={capitalize(profile.lname) ?? "Suresh"}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Form.Group>
                            <Form.Label>Level</Form.Label>
                            <Form.Control
                                readOnly
                                value={capitalize(profile.level) ?? "National"}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                readOnly
                                value={capitalize(profile.state) ?? "Kerala"}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>District</Form.Label>
                            <Form.Control
                                readOnly
                                value={capitalize(profile.district)}
                            />
                        </Form.Group>
                    </Row>
                </Container>
            </Form>
        </div>
    );
}

export default UserDetails;