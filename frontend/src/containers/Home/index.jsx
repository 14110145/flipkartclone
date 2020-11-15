import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layout";
const Home = () => {
  return (
    <>
      <Layout>
        <Jumbotron style={{ backgroundColor: "#fff" }} className="text-center">
          <h1>Wellcome to Admin Dashboard</h1>
        </Jumbotron>
      </Layout>
    </>
  );
};

export default Home;
