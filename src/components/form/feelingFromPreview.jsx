import React from "react";
import { Table } from "react-bootstrap";

const FeelingFormView = (props) => {

  const level = props.level;
  

  return level !== "" ? (
    <div
      style={{
        width: "devicewidth",
        padding: 5,
      }}
    >
      <Table hover>
        <thead>
          <tr>
            <th>Feeling</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr key={props.level}>
            <td
              style={{
                fontWeight: "bold",
                fontSize: 15,
                backgroundSize: "cover",
              }}
            >
              {props.level}
            </td>
            <td
              style={{
                backgroundColor: "#FCF3FC",
                opacity: 0.6,
                borderRadius: 5,
                whiteSpace: "pre-wrap",
              }}
            >
              {props.comment}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  ) : (
    ""
  );
};

export default FeelingFormView;
