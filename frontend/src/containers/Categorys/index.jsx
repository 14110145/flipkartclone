import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckBoxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoMdArrowDropright,
  IoMdArrowDropdown,
  IoIosSquareOutline,
  IoIosFolder,
  IoIosFolderOpen,
} from "react-icons/io";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  // Bootstrap react
  const [show, setShow] = useState(false);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        {
          label: category.name,
          value: category._id,
          children:
            category.children.length > 0 && renderCategories(category.children),
        }
        // <li key={category.name}>
        //   {category.name}{" "}
        //   {category.children.length > 0 ? (
        //     <ul>{renderCategories(category.children)}</ul>
        //   ) : null}
        // </li>
      );
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInPut = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckBoxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosSquareOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoMdArrowDropright />,
                parentClose: <IoIosFolder />,
                parentOpen: <IoIosFolderOpen />,
                expandOpen: <IoMdArrowDropdown />,
                leaf: <IoIosFolder />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
        <NewModal
          show={show}
          handleClose={handleClose}
          modalTitle={"Add New Category"}
        >
          <Input
            value={categoryName}
            placeholder={"Category Name"}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
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
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </NewModal>

        {/* Edit categories */}
        <NewModal
          show={updateCategoryModal}
          handleClose={() => setUpdateCategoryModal(false)}
          modalTitle={"Update Categories"}
          size="lg"
        >
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
                      onChange={(e) =>
                        handleCategoryInPut(
                          "name",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInPut(
                          "parentId",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
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
                      onChange={(e) =>
                        handleCategoryInPut(
                          "name",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInPut(
                          "parentId",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
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

          {/* <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          /> */}
        </NewModal>
      </Container>
    </Layout>
  );
};

export default Category;
