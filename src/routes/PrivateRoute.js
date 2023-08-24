import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import Header from "../components/Header";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";

const PrivateRoute = () => {
  const {access_token, isLoading} = useSelector((state) => state.auth);
  console.log(access_token);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return access_token ? (
    <div>
      <Header isLoggedIn={true} />

      <Container className='mt-5'>
        <Outlet />
      </Container>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};
export default PrivateRoute;
