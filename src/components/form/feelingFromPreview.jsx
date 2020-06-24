import React from "react";
import { Table } from "react-bootstrap";

const FeelingFormView = (props) => {
  const date = new Date();
  const level = props.level;
  const viewDate =
    date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();

  return level !== "" ? (
    <Table hover>
      <thead>
        <tr>
          <th>Feeling</th>
          <th>Date</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr key={props.level}>
          <td
            style={{
              fontWeight: "bold",
              fontSize: 40,
              backgroundSize: "cover",
            }}
          >
            {props.level}
          </td>
          <td
            style={{
              backgroundColor: "#FCF3FC",
              opacity: 1.5,
            }}
          >
            {viewDate}
          </td>
          <td
            style={{
              backgroundColor: "#FCF3FC",
              opacity: 0.6,
              borderRadius: 5,
              whiteSpace: 'pre-wrap'
            }}
          >
            {props.comment}
          </td>
        </tr>
      </tbody>
    </Table>
  ) : (
    ""
  );
};

export default FeelingFormView;
