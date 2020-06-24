import React, { Component } from "react";

import validate from "../../services/validationService";
import authService from "../../services/authService";
import UserRegInput from "./signupInput";

import { toast } from "react-toastify";
import Joi from "joi-browser";


class SignUp extends Component {
  state = {
    user: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    errors: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
  };

  schema = {
    username: Joi.string().min(4).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(6).max(30).required(),
    password2: Joi.string().min(6).max(30).required(),
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = validate.validateProperty(input, this.schema);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user, errors });
  };

  handleSubmit = async (e) => {
    const { user } = this.state;
    e.preventDefault();

    let errors = validate.validate(this.state.user, this.schema);
    const { password, password2 } = this.state.user;
    if (password !== password2) {
      errors = {};
      errors.password2 = "Password2 need to match first typed password.";
    }
    if (errors) this.setState({ errors });
    if (errors) return;

    try{

      await authService.registerUser(user)
      toast.success( "Registrering successful, login to start Feeling registration.");
      window.location = "/user/login";

    } catch (ex){
     
      toast.error('Something when wrong: '+ ex.message)
      this.props.history.push('/user/register');
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <UserRegInput
        onSubmit={(e) => this.handleSubmit(e)}
        onChange={(e) => this.handleChange(e)}
        errors={errors}
        valid={errors}
      />
    );
  }
}

export default SignUp;
