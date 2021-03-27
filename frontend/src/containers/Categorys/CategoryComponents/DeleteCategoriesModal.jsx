import React from "react";
import NewModal from "../../../components/UI/Modal";

const DeleteCategoryModal = (props) => {
  const { show, handleClose, deleteCategories, expandedArray, checkedArray, modalTitle } = props;
  return (
    <NewModal
      modalTitle={modalTitle}
      show={show}
      handleClose={handleClose}
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

export default DeleteCategoryModal;
