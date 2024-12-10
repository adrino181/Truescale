import { useState } from "react";
import Modal from "@/components/Modal";
import CreatePostCard from "@/components/Blocks/Cards/createPost";
import StripePayment from "./stripe";
import AiToolUI from "./AiToolUi";
import TagEditor from "./TagEditor";
import ChoosePostType from "./ChoosePostType";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const AddPostModal = (props) => {
  const {
    modalData,
    theme,
    actions,
    setTags,
    tagsData,
    postType,
    setPostType,
    ...modalProps
  } = props;
  const { typeModal } = modalProps;
  const { handleModalStateChange } = actions || {};
  const [modalState, setModalState] = useState([]);
  const handleFormInput = (e) => {
    handleModalStateChange(e.target.value);
  };

  return (
    <Modal saveText="Done" len={1} fullWidth maxWidth="xs" {...modalProps}>
      <>
        {typeModal === "payment" ? (
          <StripePayment />
        ) : typeModal === "AiTool" ? (
          <AiToolUI onChange={handleFormInput} value={modalData} />
        ) : (
          <>
            <CreatePostCard
              post={{
                blockData: modalData?.blocks || [],
                tags: tagsData || [],
              }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption">Choose Tags</Typography>
              <TagEditor theme={theme} selected={tagsData} onChange={setTags} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption">Choose Post Type</Typography>
              <ChoosePostType
                theme={theme}
                selected={postType}
                onChange={setPostType}
              />
            </Box>
          </>
        )}
      </>
    </Modal>
  );
};

export default AddPostModal;
