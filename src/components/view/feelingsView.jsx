import React, { Component } from "react";
import feelingService from "../../services/feelingService";
import http from "../../services/httpService";
import auth from "../../services/authService";
import catimage from "../../img/cat.png";
import Moment from "react-moment";
import _ from "lodash";
import LinearProgress from "@material-ui/core/LinearProgress";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from "@material-ui/icons/Delete";
import { Table, Jumbotron, Button } from "react-bootstrap";

const backEndUrl = process.env.REACT_APP_BACK_END_URL;

class FeelingsView extends Component {
  state = {
    isLoading: true,
    feelings: [],
    sortColumn: { path: "date", order: "desc" },
    userId: "",
    showTioolTip: false,
  };

  async componentDidMount() {
    const user = auth.getUser();
    if (user) {
      try {
        const userId = { userId: user.id };
        const { data: feelings } = await http.post(
          backEndUrl + "/feelings/feelings-list",
          userId
        );
        this.setState({ feelings, isLoading: false, userId });
      } catch (ex) {}
    }
  }

  handleRemove = async (feeling) => {
    const originalfeelings = [...this.state.feelings];
    const feelings = this.state.feelings.filter((f) => f._id !== feeling._id);
    this.setState({ feelings: feelings });

    try {
      await http.delete(
        backEndUrl + "/feelings/delete-feeling/" + feeling._id
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        alert("This feeling state has already been deleted.");
      this.setState({ feelings: originalfeelings });
    }
  };

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    this.setState({ sortColumn: { path, order: sortColumn.order } });
  };

  renderSortIcon = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    let icon = null;
    if (sortColumn.path !== path) return icon;
    if (sortColumn.order === "desc")
      icon = <FontAwesomeIcon icon={faArrowUp} />;
    else icon = <FontAwesomeIcon icon={faArrowDown} />;
    return icon;
  };

  handleEdit = (feeling) => {
    feelingService.sendFeelingToUpdate(feeling);
    return this.props.history.push("/editfeeling");
  };

  mouseOver = () => this.setState({ showTioolTip: true });
  mouseOut = () => this.setState({ showTioolTip: false });

  render() {
    const { feelings, sortColumn, isLoading } = this.state;

    const sortedFeelings = _.orderBy(
      feelings,
      [sortColumn.path],
      [sortColumn.order]
    );

    if (isLoading) return <LinearProgress color="secondary" />;

    return (
      <div >
        <Jumbotron
          fluid
          style={{
            padding: '10vh',
            backgroundImage: `url(${catimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          
            <h4
              style={{
                fontWeight: "bold",
                padding: 5,
                align: "center",
              }}
              align="center"
            >
              Feeling Records History
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
                        opacity: 0.5,
                        flex: 1,
                        borderRadius: 5,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {feeling.comment}
                    </td>
                    <td value={feeling._id}>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this feeling?"
                            )
                          )
                            this.handleRemove(feeling);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </td>
                    <td value={feeling._id}>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => {
                          this.handleEdit(feeling);
                        }}
                      >
                        <small>update</small>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          
        </Jumbotron>
      </div>
    );
  }
}

export default FeelingsView;
