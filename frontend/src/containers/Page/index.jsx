import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";
import linearCategories from "../../helpers/linearCategories";
import { createPage } from "../../actions";

const Page = (props) => {
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setCreateModal(false);
      setDesc("");
      setType("");
      setTitle("");
      setBanners([]);
      setProducts([]);
    }
  }, [page]);

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const onCategoryChange = (e) => {
    const category = categories.find((cat) => cat.value === e.target.value);
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const submitPage = (e) => {
    if (!title) {
      alert("Title is required");
      setCreateModal(false);
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner) => {
      form.append("banners", banner);
    });
    products.forEach((product) => {
      form.append("products", product);
    });
    dispatch(createPage(form));
  };

  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={createModal}
        modalTitle={"Create new modal"}
        handleClose={() => setCreateModal(false)}
        handleSaveBtn={submitPage}
      >
        <Row>
          <Col>
            <select className="form-control form-control-sm" value={categoryId} onChange={onCategoryChange}>
              <option value="">Select category</option>
              {categories.map((cat) => {
                return (
                  <option key={cat.value} value={cat.value}>
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
            {banners.length > 0
              ? banners.map((banner, index) => {
                  return (
                    <Row key={index}>
                      <Col>{banner.name}</Col>
                    </Row>
                  );
                })
              : null}
            <Input type="file" name="banners" onChange={handleBannerImages} />
          </Col>
        </Row>

        <Row>
          <Col>
            {products.length > 0
              ? products.map((product, index) => {
                  return (
                    <Row key={index}>
                      <Col>{product.name}</Col>
                    </Row>
                  );
                })
              : null}
            <Input type="file" name="products" onChange={handleProductImages} />
          </Col>
        </Row>
      </NewModal>
    );
  };
  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Creating page...please wait!!!</p>
      ) : (
        <>
          {renderCreatePageModal()}
          <button onClick={() => setCreateModal(true)}>Create Page</button>
        </>
      )}
    </Layout>
  );
};

export default Page;
