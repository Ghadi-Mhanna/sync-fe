import React, {useEffect} from "react";
import {Button, Container, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteCategory} from "../config/api";
import {fetchAllCategories} from "../redux/categoriesSlice";

function Categories() {
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categories);

  const handleDelete = async (uuid) => {
    await deleteCategory(uuid).then((res) => {
      if (res.status === 200) {
        dispatch(fetchAllCategories());
      } else {
        console.log("fail");
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <Container className='mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='mb-0'>Categories Page</h2>
        <Link to='/create-category' className='btn btn-primary'>
          Add New Category
        </Link>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.uuid}>
              <td>{category.id}</td>
              <td>
                <Link to={`/categories/${category.uuid}`}>
                  {category.title}
                </Link>
              </td>
              <td>{category.descriptions}</td>
              <td className='d-flex justify-content-center'>
                <Button
                  variant='danger'
                  onClick={() => handleDelete(category.uuid)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Categories;
