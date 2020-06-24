import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginInput from "./loginInput";
import validate from "../../services/validationService";
import authService from "../../services/authService";

import { toast } from "react-toastify";
import Joi from "joi-browser";

class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(6).max(30).required(),
  };

  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { user } = this.state;

    let errors = validate.validate(this.state.user, this.schema);
    if (errors) this.setState({ errors });
    if (errors) return;

    try {
      await authService.login(user.email, user.password);

      toast.success("Login successful.");
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/feelingsview";
    } catch (ex) {
      let errorMessage;
      for (let key in ex.response.data) {
        errorMessage = " " + ex.response.data[key];
      }
      alert("Something whent wrong: -- " + errorMessage);
      window.location = "/";
    }
  };

  render() {
    console.log();
    if (authService.getUser()) return <Redirect to="/" />;
    const { errors } = this.state;

    return (
      <LoginInput
        onSubmit={(e) => this.handleSubmit(e)}
        onChange={(e) => this.handleChange(e)}
        errors={errors}
      />
    );
  }
}

export default Login;
