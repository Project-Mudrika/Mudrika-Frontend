import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";

function NewsFeed() {
  // For News Feed
  const [newsFeed, setNewsFeed] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://timesofindia.indiatimes.com/rssfeeds/2647163.cms",
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
        for (let i = 0; i < 2; i++) {
          const title = items[i].getElementsByTagName("title")[0].textContent;
          const link = items[i].getElementsByTagName("link")[0].textContent;
          tempNewsFeed.push({ title: title, link: link });
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
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {newsFeed.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default NewsFeed;
