import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  useEffect(() => {}, []);

  return true ? page : <Navigate replace to="/login" />;
};

export default PrivateRoute;
