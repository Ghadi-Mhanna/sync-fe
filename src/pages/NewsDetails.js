import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Form, Button, Image} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";
import {fetchOneNews} from "../redux/newsSlice";
import moment from "moment";
import {fetchAllCategories} from "../redux/categoriesSlice";
import {updateNews} from "../config/api";

function NewsDetails() {
  const {uuid} = useParams();
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categories);

  const {oneNews, isLoading} = useSelector((state) => state.news);
  const navigate = useNavigate();
  const [image, setImage] = useState(oneNews?.images[0]?.path);

  const [selectedCategory, setSelectedCategory] = useState(
    oneNews?.category?.uuid || ""
  );

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    date: Yup.date().required("Date is required"),
  });

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    setImage(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (values) => {
    // Implement your save/update logic here
    console.log(values);
    let obj = {
      title: values.title,
      content: values.content,
      categoryUuid: selectedCategory,
      date: moment(values.date).toISOString(),
      imagePaths: [image],
    };
    console.log("Form data:", obj);
    await updateNews(oneNews?.uuid, obj).then((res) => {
      if (res.status === 200) {
        navigate("/news");
      } else {
        console.log("fail");
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAllCategories());

    dispatch(fetchOneNews(uuid));
  }, [dispatch, uuid]);
  return (
    <Container className='mt-5'>
      <h2 className='text-center mb-4'>News Details</h2>
      {isLoading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <Formik
            initialValues={{
              title: oneNews?.title,
              content: oneNews?.content,
              date: moment(oneNews?.date).format("YYYY-MM-DD"),
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
                <Form.Group controlId='title'>
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    type='text'
                    name='title'
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.title && errors.title}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.title}
                  </Form.Control.Feedback>
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
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.content && errors.content}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.content}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='date'>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type='date'
                    name='date'
                    value={values.date || ""}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      handleChange("date")(selectedDate);
                    }}
                    onBlur={handleBlur}
                    isInvalid={touched.date && errors.date}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.date}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='image'>
                  <Form.Label>Image:</Form.Label>
                  <Form.Control type='file' onChange={handleImageChange} />
                  {image && <Image src={image} alt='News' className='mt-2' />}
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

export default NewsDetails;
