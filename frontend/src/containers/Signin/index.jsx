import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch } from "react-redux";

const Signin = (props) => {
  const dispatch = useDispatch();
  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email: "ltphu123",
      password: "@ltphu123",
    };
    dispatch(login(user));
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form style={{ marginTop: "50px" }} onSubmit={userLogin}>
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                value=""
                onChange={() => {}}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value=""
                onChange={() => {}}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
