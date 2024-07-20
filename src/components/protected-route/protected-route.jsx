import { Navigate, useLocation } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRouteElement = ({ component, onlyAuth = true }) => {
  const { user, isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <GridLoader
        color="#8585ad"
        loading={true}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate('-50%', '-50%')",
        }}
      />
    );
  }

  if (!onlyAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (onlyAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const RouteOnlyAuth = ProtectedRouteElement;
export const RouteOnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement component={component} onlyAuth={false} />
);

ProtectedRouteElement.propTypes = {
  component: PropTypes.element.isRequired,
  onlyAuth: PropTypes.bool,
};
