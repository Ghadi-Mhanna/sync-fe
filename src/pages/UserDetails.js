import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Form, Button} from "react-bootstrap";
import {fetchOneUser} from "../redux/usersSlice";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {updateUser} from "../config/api";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role is required"),
});

function UserDetails() {
  const {uuid} = useParams();
  const dispatch = useDispatch();
  const {oneUser, isLoading} = useSelector((state) => state.users);
  const navigate = useNavigate();
  const initialValues = {
    userName: oneUser ? oneUser.user_name : "",
    email: oneUser ? oneUser.email : "",
    firstName: oneUser ? oneUser.first_name : "",
    lastName: oneUser ? oneUser.last_name : "",
    role: oneUser ? oneUser.role : "superAdmin",
  };

  const handleSubmit = async (values) => {
    let obj = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      role: values?.role,
      userName: values?.userName,
    };
    await updateUser(oneUser?.uuid, obj).then((res) => {
      if (res.status === 200) {
        navigate("/users");
      } else {
        console.log("fail");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchOneUser(uuid));
  }, [dispatch, uuid]);
  return (
    <Container className='mt-5'>
      <h2 className='text-center mb-4'>User Details</h2>
      {isLoading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <Formik
            initialValues={initialValues}
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
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    name='userName'
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.userName && !!errors.userName}
                  />
                  <ErrorMessage
                    name='userName'
                    component='div'
                    className='text-danger'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='text'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                    disabled={true}
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-danger'
                  />
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
                  <ErrorMessage
                    name='firstName'
                    component='div'
                    className='text-danger'
                  />
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
                  <ErrorMessage
                    name='lastName'
                    component='div'
                    className='text-danger'
                  />
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
                  <ErrorMessage
                    name='role'
                    component='div'
                    className='text-danger'
                  />
                </Form.Group>
                <Button variant='primary' type='submit' className='mt-2'>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Container>
  );
}

export default UserDetails;
