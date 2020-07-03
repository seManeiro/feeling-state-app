import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

class NavBar extends Component {
  render() {
    const { user, loggedIn, onLogout } = this.props;

    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/">
          <Button variant="outlined" style={{ color: "#E6E6FA" }}>
            Feelins State Metrics
          </Button>
        </Navbar.Brand>
        {loggedIn && (
          <Navbar.Brand href="/addfeeling">
            <Button variant="outlined" style={{ color: "#E6E6FA" }}>
              {" "}
              +
            </Button>{" "}
          </Navbar.Brand>
        )}
        {loggedIn && (
          <Navbar.Brand href="/csvcreator">
            <Button variant="outlined" style={{ color: "#E6E6FA" }}>
              {" "}
             csv
            </Button>{" "}
          </Navbar.Brand>
        )}

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {loggedIn && (
            <React.Fragment>
              <Navbar.Brand>
                <IconButton
                  size="small"
                  aria-label="add an alarm"
                  style={{ color: "#E6E6FA" }}
                  disabled
                >
                  <small>login as - {user.username}</small>
                </IconButton>
              </Navbar.Brand>
              <Navbar.Brand>
                <IconButton
                  size="small"
                  style={{ color: "#E6E6FA" }}
                  onClick={onLogout}
                >
                  <small>logout</small>
                </IconButton>
              </Navbar.Brand>
            </React.Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
