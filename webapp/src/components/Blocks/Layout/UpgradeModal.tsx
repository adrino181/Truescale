import { useState } from "react";
import Modal from "@/components/Modal";
import Payment from "@/components/Blocks/Pricing";

const UpgradeModal = (props) => {
  const { modalData, theme, actions, setTags, tagsData, ...modalProps } = props;

  const { handleModalStateChange } = actions || {};

  return (
    <Modal saveText="Done" len={1} fullWidth maxWidth="xs" open {...modalProps}>
      <Payment />
    </Modal>
  );
};

export default UpgradeModal;
