import Modal from "@/components/Modal";
import CreateGroup from "./create-group";
import { UseCreateHook } from "./hooks";
const CreateGroupModal = (props) => {
  const { modalData, theme, actions, setTags, tagsData, ...modalProps } = props;

  const { handleModalStateChange } = actions || {};
  const { groupStatus, submitHandler } = UseCreateHook();

  return (
    <Modal
      sx={{ padding: 0, "& > .MuiDialogContent-root": { padding: 0 } }}
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
      open
      {...modalProps}
    >
      <CreateGroup status={groupStatus} submitHandler={submitHandler} />
    </Modal>
  );
};

export default CreateGroupModal;
