import React from "react";
import Modal from "@/components/Modal";
import EditForm from "./edit-form";

const EditModal = ({
  open,
  handleClose,
  configs,
  submitHandler,
  isLoading,
}) => {
  return (
    <Modal
      styledProp={{
        padding: 0,
        "& > .MuiDialogContent-root": { padding: 0 },
        "& > .MuiDialogActions-root": { display: "none" },
        "& > .MuiPaper-root": {
          width: "100%",
        },
      }}
      len={0}
      fullWidth
      maxWidth="lg"
      open={open}
      handleClose={handleClose}
    >
      <EditForm
        status={isLoading}
        configs={configs}
        submitHandler={submitHandler}
      />
    </Modal>
  );
};

export default EditModal;
