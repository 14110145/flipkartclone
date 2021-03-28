import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";
import linearCategories from "../../helpers/linearCategories";

const Page = (props) => {
  const category = useSelector((state) => state.category);
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, []);

  const handleBannerImages = (e) => {
    console.log(e);
  };

  const handleProductImages = (e) => {
    console.log(e);
  };

  const renderCreatePageModal = () => {
    return (
      <NewModal show={createModal} modalTitle={"Create new modal"} handleClose={() => setCreateModal(false)}>
        <Row>
          <Col>
            <select
              className="form-control form-control-sm"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat) => {
                return (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </Col>
          <Col>
            <Input
              className="form-control form-control-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Page title"}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              className="form-control form-control-sm"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={"Page desc"}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <input type="file" name="banners" onChange={handleBannerImages} />
          </Col>
        </Row>

        <Row>
          <Col>
            <input type="file" name="products" onChange={handleProductImages} />
          </Col>
        </Row>
      </NewModal>
    );
  };
  return (
    <Layout sidebar>
      {renderCreatePageModal()}
      <button onClick={() => setCreateModal(true)}>Create Page</button>
    </Layout>
  );
};

export default Page;
