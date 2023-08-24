import React, {useState} from "react";
import {Container, Row, Col, Card, Form, Button} from "react-bootstrap";
//image
import backgroundImage from "../assets/login_bg.jpg";

import {loginUser} from "../redux/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   const {access_token} = useSelector((state) => state.auth);
  //   console.log("access_token", access_token);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    let loginData = {
      email: email,
      password: password,
    };
    const result = await dispatch(loginUser(loginData));
    console.log("loginData", loginData);
    dispatch(loginUser(loginData));
    console.log("result", result);
    if (result.status === 200) {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className='justify-content-end h-100'>
          <Col md={5}>
            <Card style={{padding: "50px"}}>
              <Card.Body>
                <Card.Title className='text-center'>Sign In</Card.Title>
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='text'
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder='Email'
                    />
                  </Form.Group>
                  <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Password'
                    />
                  </Form.Group>
                  <div className='text-center mt-4'>
                    <Button variant='primary' type='submit' className='w-100'>
                      Sign In
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
