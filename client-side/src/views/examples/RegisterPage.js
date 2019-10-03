/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Shukri Abdi and Bryan Brinson

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import SubNavbar from "components/Navbars/SubNavbar.js";
import BASE_URL from "../../constants";

function RegisterPage(props) {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const [body, setBody] = useState({
    email: "",
    password: ""
  });

  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectProfile, setRedirectProfile] = useState(false);

  // const [tooltipOpen, setTooltipOpen] = React.useState(false);

  // const toggleTooltip = () => {
  //   if (tooltipOpen === false) {
  //     setTooltipOpen(true);
  //   }
  //   if (tooltipOpen === true) {
  //     setTooltipOpen(false);
  //   }
  // };

  const handleSubmit = e => {
    e.preventDefault();
    body.email = e.target.email.value;
    body.password = e.target.password.value;

    console.log(body, BASE_URL);

    axios
      .post(`${BASE_URL}/auth/signup`, body)
      .then(response => {
        console.log(response);
        localStorage.setItem("authToken", response.data.token);
        // props.updateUser();
        setRedirectHome(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (props.user._id || redirectProfile === true) {
    return <Redirect to="/profile-page" />;
  } else if (redirectHome === true) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <SubNavbar />
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" + require("assets/img/login-image.jpg") + ")"
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Welcome</h3>
                  <Form className="register-form" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <Input placeholder="Email" type="text" name="email" />
                    <label>Password</label>
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                    />
                    <Button
                      block
                      className="btn-round"
                      color="danger"
                      type="submit"
                    >
                      Register
                    </Button>
                  </Form>
                  <div className="forgot">
                    <Button
                      className="btn-link"
                      color="danger"
                      onClick={e => e.preventDefault()}
                    >
                      Forgot password? (not implemented)
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="footer register-footer text-center">
            <h6>
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Shukri Abdi and Bryan
              Brinson
            </h6>
          </div>
        </div>
      </>
    );
  }
}
export default RegisterPage;
