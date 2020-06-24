import React, { Component } from "react";
import catimage from "../img/cat.png";
import { Jumbotron } from "react-bootstrap";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import jwtDecode from "jwt-decode";

class Home extends Component {
  state = {
    user: "",
    loggedIn: false,
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user, loggedIn: true });
    } catch (ex) {}
  }

  render() {
    const {loggedIn } = this.state;

    return (
      <Jumbotron
        style={{
          backgroundImage: `url(${catimage})`,
          backgroundSize: "cover",
          height: 1000,
        }}
      >
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <h4>
            <b>Feeling</b> state application, help you follow your{" "}
            <span style={{ fontFamily: "monospace" }}>feelings</span> state
            through time, with stadistical views and diagrams.
          </h4>
          <p className="flow-text grey-text text-darken-1">
            submit daily (feelings sates) to monitor your feelings flow.
          </p>
          <br />

          <div className="row">
            {!loggedIn && (
              <React.Fragment>
                <Box>
                  <Button
                    variant="contained"
                    href="/user/register"
                    style={{
                      width: "240px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Signup <small> (new user)</small>
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    href="/user/login"
                    style={{
                      width: "140px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                    }}
                    className="btn btn-large btn-flat waves-effect white black-text"
                  >
                    Login
                  </Button>
                </Box>
              </React.Fragment>
            )}

            {loggedIn &&
            <Box>
              <Button
                variant="contained"
                href="/feelingsview"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                history
              </Button>
            </Box>
            }
          </div>
        </div>
      </Jumbotron>
    );
  }
}
export default Home;
