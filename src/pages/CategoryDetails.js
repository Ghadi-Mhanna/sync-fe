import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Form, Button} from "react-bootstrap";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {updateCategory} from "../config/api";
import {fetchOneCategory} from "../redux/categoriesSlice";

function CategoryDetails() {
  const {uuid} = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {oneCategory, isLoading} = useSelector((state) => state.categories);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values) => {
    let obj = {
      title: values?.name,
      descriptions: values?.description,
    };
    await updateCategory(oneCategory?.uuid, obj).then((res) => {
      if (res.status === 200) {
        navigate("/categories");
      } else {
        console.log("fail");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchOneCategory(uuid));
  }, [dispatch, uuid]);

  return (
    <Container className='mt-5'>
      <h2>Edit Category</h2>
      {isLoading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <Formik
            initialValues={{
              name: oneCategory?.title,
              description: oneCategory?.descriptions,
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
                    name='name'
                    placeholder='Title'
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <ErrorMessage name='name' component='div' className='error' />
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
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Container>
  );
}

export default CategoryDetails;
