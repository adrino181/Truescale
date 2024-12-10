import Modal from "@/components/Modal";
import { UseCreateHook } from "@/components/Modules/Group/hooks";
import dynamic from "next/dynamic";
import { Suspense } from 'react'
import { UsePostHook } from "../Posts/hooks";
import PostEditor from "./components/postBar";

const CreateGroup = dynamic(import("@/components/Modules/Group/create-group"), {
  ssr: false,
});
const ModalAdapter = ({ open, handleClose, value, theme }) => {
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
      maxWidth="sm"
      open={open}
      handleClose={handleClose}
    >
      <Suspense fallback={<p>Loading....</p>}>
        {
          value === 0 ? (
            <PostEditor handleClose={handleClose} theme={theme}/>
          ) :
            value === 1 ? (
              <CreateGroup status={groupStatus} submitHandler={submitHandler} />
            ) : <></>
        }
      </Suspense>
    </Modal>
  );
};

export default ModalAdapter;
