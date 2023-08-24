import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {fetchAllUsers} from "../redux/usersSlice";
import {deleteUser} from "../config/api";
import "../css/Tables.css";
function Users() {
  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.users);

  const handleDelete = async (uuid) => {
    await deleteUser(uuid).then((res) => {
      if (res.status === 200) {
        dispatch(fetchAllUsers());
      } else {
        console.log("fail");
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <Container className='mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='mb-0'>Users Page</h2>
        <Link to='/create-user' className='btn btn-primary'>
          Add New User
        </Link>
      </div>
      <Table responsive striped bordered hover className='custom-table'>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((users) => (
            <tr key={users.uuid}>
              <td>
                <Link to={`/user/${users.uuid}`}>{users.user_name}</Link>
              </td>
              <td>{users.email}</td>
              <td>{users.first_name}</td>
              <td>{users.last_name}</td>
              <td>{users.role}</td>
              <td className='d-flex justify-content-center'>
                <Button
                  variant='danger'
                  onClick={() => handleDelete(users.uuid)}
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

export default Users;
