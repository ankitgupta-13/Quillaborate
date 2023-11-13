import React, { useEffect, useState } from "react";
import Login from "./container/auth/Login";

interface PrivateRouteProps {
  Component: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { Component } = props;
  const [prevLocation, setPreviousLocation] = useState("");
  useEffect(() => {
    setPreviousLocation(window.location.href);
  }, []);
  return (
    <div>
      {localStorage.getItem("userId") ? (
        <>{Component}</>
      ) : (
        <Login prevLocation={prevLocation} />
      )}
    </div>
  );
};

export default PrivateRoute;
