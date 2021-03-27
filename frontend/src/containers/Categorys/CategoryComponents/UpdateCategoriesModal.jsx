import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import NewModal from "../../../components/UI/Modal";

const UpdateCategoriesModal = (props) => {
  {
    /* Update categories modal */
  }
  const { handleClose, modalTitle, size, expandedArray, checkedArray, handleCategoryInPut, categoryList } = props;
  return (
    <NewModal show={show} handleClose={handleClose} modalTitle={modalTitle} size={size}>
      <Row>
        <Col>
          <h6>Expanded Categories</h6>
        </Col>
      </Row>

      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"Category Name"}
                  onChange={(e) => handleCategoryInPut("name", e.target.value, index, "expanded")}
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) => handleCategoryInPut("parentId", e.target.value, index, "expanded")}
                >
                  <option>Select category</option>
                  {createCategoryList(category.categories).map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          );
        })}

      <Row>
        <Col>
          <h6>Checked Categories</h6>
        </Col>
      </Row>

      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"Category Name"}
                  // onChange={(e) => setCategoryName(e.target.value)}
                  onChange={(e) => handleCategoryInPut("name", e.target.value, index, "checked")}
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) => handleCategoryInPut("parentId", e.target.value, index, "checked")}
                >
                  <option>Select category</option>
                  {createCategoryList(category.categories).map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          );
        })}
    </NewModal>
  );
};

export default UpdateCategoriesModal;
