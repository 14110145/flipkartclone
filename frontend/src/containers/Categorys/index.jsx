import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  updateCategories,
  getAllCategory,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
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
import UpdateCategoriesModal from "./CategoryComponents/UpdateCategoriesModal";

const Category = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children: category.children.length > 0 && renderCategories(category.children),
      });
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
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find((category, _index) => categoryId == category.value);
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find((category, _index) => categoryId == category.value);
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInPut = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) => {
        return index == _index ? { ...item, [key]: value } : item;
      });
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
    setUpdateCategoryModal(false);
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdArray = checkedArray.map((item, index) => {
      return { _id: item.value };
    });
    const expandedIdArray = expandedArray.map((item, index) => {
      return { _id: item.value };
    });
    const idArray = expandedIdArray.concat(checkedIdArray);

    if (checkedIdArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      });
    }
  };

  const renderDeleteCategoryModal = () => {
    return (
      <NewModal
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "yes",
            color: "danger",
            onClick: () => deleteCategories(),
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => {
          return <span key={index}>{item.name}</span>;
        })}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => {
          return <span key={index}>{item.name}</span>;
        })}
      </NewModal>
    );
  };

  const renderAddCategoryModal = () => {
    {
      /* Add category modal */
    }

    return (
      <NewModal show={show} handleClose={handleClose} modalTitle={"Add New Category"}>
        <Input value={categoryName} placeholder={"Category Name"} onChange={(e) => setCategoryName(e.target.value)} />
        <select className="form-control" value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
          <option>Select category</option>
          {createCategoryList(category.categories).map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        <input type="file" name="categoryImage" onChange={handleCategoryImage} />
      </NewModal>
    );
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
            <button onClick={deleteCategory}>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInPut={handleCategoryInPut}
        categoryList={createCategoryList(category.categories)}
      />
      {renderAddCategoryModal()}

      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
