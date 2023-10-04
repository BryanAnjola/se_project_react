import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../AppContext/AppContext";
const ProtectRoute = ({ component: Component, ...props }) => {
  const value = React.useContext(AppContext);
  return (
    <Route
      {...props}
      render={(props) =>
        value && value.state.loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectRoute;
