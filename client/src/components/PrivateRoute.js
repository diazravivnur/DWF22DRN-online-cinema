import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useContext(UserContext);
  const { login } = state;
  useEffect(() => {
    if (!login) {
      dispatch({ type: "showLoginPopup" });
    }
  }, [login]);

  return (
    <Route
      {...rest}
      render={(props) =>
        login ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
