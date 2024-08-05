import { Navigate, useLocation } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { FC, ReactElement } from "react";
import { Store } from "../../types";

interface ProtectedRouteProps {
  component: ReactElement;
  onlyAuth: boolean;
}

interface Component {
  component: ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component, onlyAuth }) => {
  const { user, isAuthChecked } = useSelector((store: Store) => store.user);
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

export const RouteOnlyAuth = ({ component }: Component) => (
  <ProtectedRoute component={component} onlyAuth={true} />
);
export const RouteOnlyUnAuth = ({ component }: Component) => (
  <ProtectedRoute component={component} onlyAuth={false} />
);
