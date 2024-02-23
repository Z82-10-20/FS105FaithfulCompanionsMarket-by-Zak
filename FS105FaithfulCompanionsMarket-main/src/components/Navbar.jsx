import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import fcmlogo from '../images/logo/fcmlogo.jpeg';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async() => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white position-fixed w-100 mt-0 fw-semibold custom-navbar-zindex">
      <Navbar expanded={expanded} expand="lg" className="navbar navbar-text-white" variant="light">
        <Container>
          <a href="/">
            <img src={fcmlogo} alt="" className="nasmer me-5 custom-navbar-icon" />
          </a>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="aboutus" className="custom-navbar-text">
                About Us
              </Nav.Link>
              <Nav.Link href="contactus" className="custom-navbar-text">
                Contact Us
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="custom-navbar-text">
                <NavDropdown.Item className="text-dark custom-navbar-dropdown" href="/cats">
                  Cats
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark custom-navbar-dropdown" href="/dogs">
                  Dogs
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark custom-navbar-dropdown" href="/birds">
                  Birds
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark custom-navbar-dropdown" href="/fishes">
                  Fishes
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark custom-navbar-dropdown" href="/petaccessories">
                  Accessories
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark custom-navbar-dropdown" href="/petfoods">
                  Pet Foods
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="d-flex align-items-center">
          
{userInfo ? (
  <NavDropdown title={userInfo.name} id="username">
    <LinkContainer to="/profile">
      <NavDropdown.Item className="text-dark custom-navbar-dropdown">Profile</NavDropdown.Item>
    </LinkContainer>
    <NavDropdown.Item onClick={logoutHandler} className="text-dark custom-navbar-dropdown">Logout</NavDropdown.Item>
  </NavDropdown>
) : (
  <LinkContainer to="/login">
    <Nav.Link href="/login">
      <FaUser /> Login
    </Nav.Link>
  </LinkContainer>
)}
{userInfo && userInfo.isAdmin && (
<NavDropdown title ='Admin' id='adminmenu'> 
  <LinkContainer to='/admin/birdlist'>
  <NavDropdown.Item className="text-dark custom-navbar-dropdown">BirdListPage</NavDropdown.Item>
  </LinkContainer>
  <LinkContainer to='/admin/catlist'>
  <NavDropdown.Item className="text-dark custom-navbar-dropdown">CatListPage</NavDropdown.Item>
  </LinkContainer>
  <LinkContainer to='/admin/userlist'>
  <NavDropdown.Item className="text-dark custom-navbar-dropdown">Users</NavDropdown.Item>
  </LinkContainer>
  <LinkContainer to='/admin/orderlist'>
  <NavDropdown.Item className="text-dark custom-navbar-dropdown">Orders</NavDropdown.Item>
  </LinkContainer>
</NavDropdown>
)}


              <Link to="/cart">
                <button variant="light" className="custom-navbar-login ms-4">
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((total, item) => total + item.qty, 0)}
                    </Badge>
                  )}
                </button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
