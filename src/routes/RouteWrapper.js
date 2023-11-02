import React from "react";
import { Route, Redirect } from "react-router-dom";

// import PropTypes from "prop-types";
// import { useLocation } from "react-router";
// import { useHistory } from "react-router-dom";
// import { useRouteMatch } from "react-router";

import { useSelector } from "react-redux";


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }} />
//   )} />
// )

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//       localStorage.getItem('user')
//           ? <Component {...props} />
//           : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//   )} />
// )


export default function CustomRoute({
  component: Component,
  path,
  authType,
  redirect,
  ...rest
}) {

  const isLoggedIn = useSelector(state => state.user).isAuthenticated;

  if (authType==='private' && !isLoggedIn) {
    return <Redirect to="/sign-in" />;
  }
  if (authType==='public' && isLoggedIn ) {
    return <Redirect to="/dashboard" />;
  }
 
  return <Route {...rest} component={Component} />;
}

// RouteWrapper.propTypes = {
//   isPrivate: PropTypes.bool,
//   component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
// };
// RouteWrapper.defaultProps = {
//   isPrivate: false
// };
