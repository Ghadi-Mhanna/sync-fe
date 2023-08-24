import React from "react";
import {Container, Form, Button} from "react-bootstrap";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {addCategory} from "../config/api";
import {useNavigate} from "react-router-dom";

function NewCategory() {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values) => {
    let obj = {
      title: values?.title,
      descriptions: values?.description,
    };
    await addCategory(obj).then((res) => {
      if (res.status === 200) {
        navigate("/categories");
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <Container className='mt-5'>
      <h2>Add New Category</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({handleSubmit, handleChange, values, touched, errors}) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Title'
                value={values.title}
                onChange={handleChange}
                isInvalid={touched.title && !!errors.title}
              />
              <ErrorMessage name='title' component='div' className='error' />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={4}
                name='description'
                placeholder='Description'
                value={values.description}
                onChange={handleChange}
                isInvalid={touched.description && !!errors.description}
              />
              <ErrorMessage
                name='description'
                component='div'
                className='error'
              />
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-2'>
              Create Category
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default NewCategory;
