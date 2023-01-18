import React from "react";
import { Link } from "react-router-dom";
import redditLogo from "../img/Reddit-Logo.png";
import { filterPosts } from "../redux/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Button, Form, Nav } from "react-bootstrap";

const Nvbar = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img
              alt=""
              src={redditLogo}
              width="90"
              height="50"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>

          <Form style={{ marginRight: "350px", width: "500px" }}>
            <Form.Control
              type="search"
              placeholder="Search Reddit"
              className="me-2"
              aria-label="Search"
              onChange={(e) => {
                dispatch(filterPosts(e.target.value));
              }}
            />
          </Form>
          <Link to="/signin">
            <Button
              className="me-3 rounded-pill"
              style={{ width: "150px", height: "40px" }}
              variant="outline-success"
            >
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              className="rounded-pill"
              style={{ width: "150px", height: "40px" }}
              variant="primary"
            >
              Sign Up
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    //   <Container>

    //   </Container>
    // </Navbar>
  );
};

export default Nvbar;
