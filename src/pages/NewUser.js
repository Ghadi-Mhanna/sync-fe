import React from "react";
import {Container, Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
//fromik and validation
import {Formik} from "formik";
import * as Yup from "yup";
//api
import {addUser} from "../config/api";

const NewUser = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    userName: Yup.string().required("Username is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values) => {
    let obj = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      password: values?.password,
      role: values?.role,
      userName: values?.userName,
    };
    await addUser(obj).then((res) => {
      if (res.status === 200) {
        navigate("/users");
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <Container className='mt-5'>
      <h2 className='text-center mb-4'>User Details</h2>
      <Formik
        initialValues={{
          email: "",
          userName: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          role: "superAdmin",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='userName'
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.userName && !!errors.userName}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.userName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.lastName && !!errors.lastName}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                as='select'
                name='role'
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.role && !!errors.role}
              >
                <option value='superAdmin'>Super Admin</option>
                <option value='admin'>Admin</option>
                <option value='user'>News Entry</option>
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.role}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-2'>
              Create user
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewUser;
