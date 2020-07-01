import React, { Component } from "react";
import http from "../../services/httpService";
import config from "../../config/env.config.json";
import auth from "../../services/authService";
import catimage from "../../img/cat.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Table, Jumbotron } from "react-bootstrap";
import Moment from "react-moment";
import _ from "lodash";
import { CSVLink } from "react-csv";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CsvCreator extends Component {
  state = {
    feelings: [],
    sortColumn: { path: "date", order: "desc" },
    pickedDates: {
      fromDate: "",
      toDate: "",
    },
    userId: "",
    fetchResult: false,
  };

  async componentDidMount() {
    const user = auth.getUser();
    if (user) {
      this.setState({ userId: user.id });
    }
  }

  renderSortIcon = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    let icon = null;
    if (sortColumn.path !== path) return icon;
    if (sortColumn.order === "desc")
      icon = <FontAwesomeIcon icon={faArrowUp} />;
    else icon = <FontAwesomeIcon icon={faArrowDown} />;
    return icon;
  };

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    this.setState({ sortColumn: { path, order: sortColumn.order } });
  };

  handleChange = ({ currentTarget: input }) => {
    const pickedDates = { ...this.state.pickedDates };
    pickedDates[input.name] = input.value;
    this.setState({ pickedDates });
  };

  handleSearch = async () => {
    const { pickedDates, userId } = this.state;
    const fromDate = new Date(pickedDates.fromDate);
    const td = new Date(pickedDates.toDate);
    const toDate = new Date(td.setDate(td.getDate() + 1));

    const req = { userId: userId, fromDate: fromDate, toDate: toDate };

    try {
      const { data: feelings } = await http.post(
        config.backendUrl + "/feelings/betweendates",
        req
      );

      if (feelings.length === 0) {
        this.setState({ fetchResult: true });
      } else {
        this.setState({ feelings, fetchResult: false });
      }
    } catch (ex) {
      alert("Something whenr wrong calling the server .....");
      console.log(JSON.stringify(ex.response));
    }
  };

  generateData(feelings) {
    let headers = ["date", "level", "comments"];
    const data = [];
    data.push(headers);
    for (let i = 0; i < feelings.length; i++) {
      data.push([feelings[i].date, feelings[i].level, feelings[i].comment]);
    }
    return data;
  }

  render() {
    const { fromDate, toDate } = this.state.pickedDates;
    const { feelings, sortColumn, fetchResult } = this.state;

    const sortedFeelings = _.orderBy(
      feelings,
      [sortColumn.path],
      [sortColumn.order]
    );

    const data = this.generateData(sortedFeelings);

    return (
      <Jumbotron
        fluid
        style={{
          padding: "10vh",
          backgroundImage: `url(${catimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            padding: 20,
          }}
        >
          <h6
            style={{
              padding: 40,
            }}
          >
            Choose Dates in between to create a CSV file.
          </h6>

          <div>
            <form>
              <TextField
                style={{
                  padding: 20,
                }}
                id="fromDate"
                name="fromDate"
                label="From Date"
                type="date"
                defaultValue=""
                onChange={(e) => this.handleChange(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{
                  padding: 20,
                }}
                id="toDate"
                name="toDate"
                label="To Date"
                type="date"
                defaultValue={fromDate}
                onChange={(e) => this.handleChange(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />{" "}
              <div
                style={{
                  padding: 20,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  disabled={fromDate === "" || toDate === ""}
                  onClick={() => this.handleSearch()}
                >
                  search
                </Button>
              </div>
            </form>
          </div>
        </div>

        {feelings.length !== 0 && (
          <div>
            <h4
              style={{
                fontWeight: "bold",
                padding: 5,
                align: "center",
              }}
              align="center"
            >
              Feeling records founds - {feelings.length}
            </h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th onClick={() => this.handleSort("level")}>
                    Feeling Level {this.renderSortIcon("level")}
                  </th>
                  <th onClick={() => this.handleSort("date")}>
                    Date {this.renderSortIcon("date")}
                  </th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {sortedFeelings.map((feeling) => (
                  <tr key={feeling._id}>
                    <td
                      style={{
                        fontWeight: "bold",
                        fontSize: 30,
                        backgroundSize: "cover",
                      }}
                    >
                      {feeling.level}
                    </td>
                    <td>
                      <Moment format="D MMM YYYY" withTitle>
                        {feeling.date}
                      </Moment>
                    </td>
                    <td
                      onMouseOver={this.mouseOver}
                      onMouseOut={this.mouseOut}
                      style={{
                        backgroundColor: "#FCF3FC",
                        opacity: 0.9,
                        flex: 1,
                        borderRadius: 5,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {feeling.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>
              <p align="right">
                <Button variant="contained" size="small">
                  <CSVLink
                    data={data}
                    filename={
                      "feelingState_" +
                      new Date().getDate() +
                      "_" +
                      new Date().getMonth() +
                      "_" +
                      new Date().getFullYear() +
                      ".csv"
                    }
                  >
                    Download CSV file
                  </CSVLink>
                </Button>
              </p>
            </div>
          </div>
        )}
        {fetchResult && (
          <div>
            {" "}
            <p>
              {" "}
              No recored found for the choosen period : '{fromDate}' - '{toDate}
              '
            </p>{" "}
          </div>
        )}
      </Jumbotron>
    );
  }
}

export default CsvCreator;
