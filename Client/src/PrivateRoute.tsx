import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./container/auth/Login";

interface PrivateRouteProps {
  Component: React.ComponentType; // This specifies that Component should be a React component.
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { Component } = props;
  const [prevLocation, setPreviousLocation] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setPreviousLocation(window.location.href);
    // localStorage.setItem("prevLocation",window.location.href);
    
  }, []);
  return (
    <div>
      {localStorage.getItem("userId") ? (
        <Component />
      ) : (
        <Login prevLocation={prevLocation} />
      )}
    </div>
  );
};

export default PrivateRoute;
