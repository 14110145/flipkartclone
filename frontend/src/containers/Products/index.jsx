import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProductById } from "../../actions/product.actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

const Products = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const product = useSelector((state) => state.product);

  // Bootstrap react
  const [show, setShow] = useState(false);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPicture = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product, index) => {
                return (
                  <tr key={product._id}>
                    <td>{index}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category.name}</td>
                    <td>
                      <button onClick={() => showProductDetailsModal(product)}>Info</button>
                      <button
                        onClick={() => {
                          const payload = { productId: product._id };
                          dispatch(deleteProductById(payload));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal handleClose={handleClose} modalTitle={"Add new Products"} show={show}>
        <Input label="Name" value={name} placeholder={"Product Name"} onChange={(e) => setName(e.target.value)} />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={"Quantity"}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input label="Price" value={price} placeholder={"Price"} onChange={(e) => setPrice(e.target.value)} />
        <Input
          label="Description"
          value={description}
          placeholder={"Description"}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option>Select category</option>
          {createCategoryList(category.categories).map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        {productPictures.length > 0 ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null}
        <input type="file" name="productPicture" onChange={handleProductPicture} />
      </NewModal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md={6}>
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => {
                return (
                  <div className="productImgContainer">
                    <img src={generatePublicUrl(picture.img)} />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
