import Router from "next/router";
import React from "react";
import { Button } from "react-bootstrap";

function consignments() {
  return (
    <div>
      consignments
      <Button
        onClick={(e) => {
          e.preventDefault();
          Router.push("/consignments/newConsignment");
        }}
      >
        New Consignment
      </Button>
    </div>
  );
}

export default consignments;
