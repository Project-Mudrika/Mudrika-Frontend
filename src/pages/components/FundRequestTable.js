import React from "react";

function FundRequestTable(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Request No</th>
          <th scope="col">To Authority Address</th>
          <th scope="col">From Applicant Authority</th>
          <th scope="col">Amount</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
}

export default FundRequestTable;
