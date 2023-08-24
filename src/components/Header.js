import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../redux/authSlice";

const Header = () => {
  const [showPopover, setShowPopover] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  console.log("user", user);
  const handleLogout = () => {
    dispatch(logoutUser());
    setShowPopover(false);
  };

  const popover = (
    <Popover id='popover-logout'>
      <Popover.Body>
        <Button variant='link' onClick={handleLogout}>
          Logout
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Sync Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/news'>
              News
            </Nav.Link>
            {(user?.role === "superAdmin" || user?.role === "admin") && (
              <Nav.Link as={Link} to='/categories'>
                Categories
              </Nav.Link>
            )}
            {user?.role === "superAdmin" && (
              <Nav.Link as={Link} to='/users'>
                Users
              </Nav.Link>
            )}
          </Nav>

          <OverlayTrigger
            trigger='click'
            placement='bottom'
            overlay={popover}
            show={showPopover}
          >
            <Button
              variant='link'
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#007bff",
                color: "white",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
                outline: "none",
              }}
              onClick={() => setShowPopover(!showPopover)}
            >
              {user?.first_name?.charAt(0)}
            </Button>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
