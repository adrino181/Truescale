import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, useTheme } from "@mui/system";

export default function ImageModal({
  children,
  open,
  handleClose,
  handleSave,
  saveText,
  len,
  imgSrc
}) {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box textAlign="right" borderBottom="1px solid #ccc">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <img src={imgSrc} alt='modal' />
      </DialogContent>
    </Dialog>
  );
}
