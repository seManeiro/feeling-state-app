import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute";
import NavBar from "./components/navBar";
import Home from "./components/home";
import SignUp from "./components/users/signup.component";
import Login from "./components/users/login.component";
import FeelingsView from "./components/view/feelingsView";
import CsvCreator from "./components/view/csvCreator";
import FeelingForm from "./components/form/feelingForm";
import FeelingEditForm from "./components/form/feelingEditForm"
import authService from "./services/authService";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

class App extends Component {
  state = {
    user: "",
    loggedIn: false,
  };

  componentDidMount() {
    try {
      const user = authService.getUser();
      if (user) this.setState({ user, loggedIn: true });
      else this.setState({ user: {}, loggedIn: false });
    } catch (ex) {}
  }

  handleLogout = () => {
    authService.logout();
    const user = {};
    this.setState({ user, loggedIn: false });
    window.location = "/";
  };

  render() {
    const { user, loggedIn } = this.state;

    return (
      <Router>
        <div>
          <ToastContainer />
          <NavBar
            user={user}
            loggedIn={loggedIn}
            onLogout={this.handleLogout}
          />
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <ProtectedRoute path="/feelingsview" component={FeelingsView} />
            <ProtectedRoute path="/addfeeling" component={FeelingForm} />
            <ProtectedRoute path="/editfeeling" component={FeelingEditForm} />
            <ProtectedRoute path="/csvcreator" component={CsvCreator} />
            <Route path="/user/register" exact={true} component={SignUp} />
            <Route path="/user/login" exact={true} component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
