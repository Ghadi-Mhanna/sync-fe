import React, {useEffect, useState} from "react";
import {Container, Form, Button, Image} from "react-bootstrap";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {fetchAllCategories} from "../redux/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment/moment";
import {addNews} from "../config/api";
import {useNavigate} from "react-router-dom";

function NewNews() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categories);

  const [image, setImage] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    date: Yup.date().required("Date is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values) => {
    let obj = {
      title: values.title,
      content: values.content,
      categoryUuid: selectedCategory,
      date: moment(values.date).toISOString(),
      imagePaths: [image],
    };

    await addNews(obj).then((res) => {
      if (res.status === 200) {
        navigate("/news");
      } else {
        console.log("fail");
      }
    });
  };

  const handleImageChange = (e, setFieldValue) => {
    const selectedImage = e.target.files[0];

    setImage(URL.createObjectURL(selectedImage));
    setFieldValue("image", selectedImage);
  };

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <Container className='mt-5'>
      <h2 className='text-center mb-4'>Add new News</h2>
      <Formik
        initialValues={{
          title: "",
          content: "",
          date: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='title'>
              <Form.Label>Title:</Form.Label>
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
            <Form.Group controlId='category'>
              <Form.Label>Select Category:</Form.Label>
              <Form.Control
                as='select'
                name='category'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value=''>Select a category</option>
                {categories.map((category) => (
                  <option key={category.uuid} value={category.uuid}>
                    {category.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='content'>
              <Form.Label>Content:</Form.Label>
              <Form.Control
                as='textarea'
                rows={5}
                name='content'
                placeholder='Content'
                value={values.content}
                onChange={handleChange}
                isInvalid={touched.content && !!errors.content}
              />
              <ErrorMessage name='content' component='div' className='error' />
            </Form.Group>
            <Form.Group controlId='date'>
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type='date'
                name='date'
                value={values.date}
                onChange={handleChange}
                isInvalid={touched.date && !!errors.date}
              />
              <ErrorMessage name='date' component='div' className='error' />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type='file'
                onChange={(e) => handleImageChange(e, setFieldValue)}
                isInvalid={touched.image && !!errors.image}
              />
              {image && <Image src={image} alt='News' className='mt-2' />}
              <ErrorMessage name='image' component='div' className='error' />
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-2'>
              Create News
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default NewNews;
