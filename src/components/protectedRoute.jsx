import React from "react";
import auth from "../services/authService";

import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({component: Component, render , ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getUser()) return <Redirect to={{
            pathname: "/user/login",
            state : {from: props.location}
        }} />;
        return Component? <Component {...props} />: render(props);
      }}
    />
  );
};

export default ProtectedRoute;
