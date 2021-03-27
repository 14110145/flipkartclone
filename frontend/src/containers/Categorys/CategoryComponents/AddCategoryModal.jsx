import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import NewModal from "../../../components/UI/Modal";

const AddCategoryModal = (props) => {
  const {
    handleClose,
    handleSaveBtn,
    modalTitle,
    categoryList,
    handleCategoryImage,
    show,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
  } = props;

  return (
    <NewModal show={show} handleClose={handleClose} modalTitle={modalTitle} handleSaveBtn={handleSaveBtn}>
      <Row>
        <Col>
          <Input
            className="form-control form-control-sm"
            value={categoryName}
            placeholder={"Category Name"}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Col>
        <Col>
          <select
            className="form-control form-control-sm"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select category</option>
            {categoryList.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <input type="file" name="categoryImage" onChange={handleCategoryImage} />
        </Col>
      </Row>
    </NewModal>
  );
};

export default AddCategoryModal;
