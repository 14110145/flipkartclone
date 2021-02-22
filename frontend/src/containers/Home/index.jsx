import React from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import Layout from "../../components/Layout";
import "./style.css";
const Home = () => {
  return (
    <>
      <Layout>
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              Side bar
            </Col>
            <Col md={10} className="" style={{ marginLeft: "auto" }}>
              Container
            </Col>
          </Row>
        </Container>
        {/* <Jumbotron style={{ backgroundColor: "#fff" }} className="text-center">
          <h1>Wellcome to Admin Dashboard</h1>
        </Jumbotron> */}
      </Layout>
    </>
  );
};

export default Home;
