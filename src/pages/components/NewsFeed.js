import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";

function NewsFeed() {
  // For News Feed
  const [newsFeed, setNewsFeed] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://www.downtoearth.org.in/rss/india",
        {
          headers: {
            Origin: "http://localhost:3000",
          },
        }
      )
      .then((response) => {
        const xmlString = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");
        let tempNewsFeed = [];
        for (let i = 0; i < 3; i++) {
          const title = items[i].getElementsByTagName("title")[0].textContent;
          const link = items[i].getElementsByTagName("link")[0].textContent;
          const description = parser.parseFromString(
            items[i].getElementsByTagName("description")[0].textContent,
            "text/html"
          );
          tempNewsFeed.push({
            title: title,
            link: link,
            description: description.body.textContent,
          });
        }
        setNewsFeed(tempNewsFeed);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(newsFeed);
  }, [newsFeed]);

  return (
    <Table striped bordered hover>
      <tbody>
        {newsFeed.map((article, index) => (
          <tr key={index}>
            <td>
              <a href={article.link} target="_blank" rel="noreferrer">
                {article.title}
              </a>
              <br />{" "}
              <small className="text-muted font-italic">
                {article.description}
              </small>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default NewsFeed;
