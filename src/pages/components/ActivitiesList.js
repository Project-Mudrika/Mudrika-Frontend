import { Container, Row, Col, Card } from "react-bootstrap";
import Masonry from "react-masonry-css";

function ActivitiesList({ activities }) {
  console.log("Activity", activities);
  return (
    <Masonry
      breakpointCols={2}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {activities[0] !== ""
        ? activities.map((activity, index) => {
            const act = JSON.parse(activity);
            return (
              <Col>
                <Card>
                  <div className="p-4">
                    <div className="h4 text-muted">{act.username}</div>
                    <small className="text-muted font-italic">
                      Posted on {new Date(act.date).toLocaleString("en-US")}
                    </small>
                  </div>
                  <Card.Img variant="top" src={act.imageLink} />
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
