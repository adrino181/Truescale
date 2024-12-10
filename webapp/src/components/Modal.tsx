import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Breakpoint, IconButton, LinearProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, useTheme } from "@mui/system";

type ModalProp = {
  children: JSX.Element;
  open: boolean;
  handleClose?: () => void;
  handleSave?: () => void;
  saveText?: string;
  len?: number;
  maxWidth?: false | Breakpoint | undefined;
  fullWidth?: boolean;
  fullScreen?: boolean;
  loading?: boolean;
  styledProp?: any;
};
export default function Modal({
  children,
  open,
  handleClose,
  handleSave,
  saveText,
  len,
  fullWidth,
  maxWidth,
  fullScreen,
  loading,
  styledProp,
}: ModalProp) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      style={{
        background: "none",
      }}
      PaperProps={{
        sx: {
          background: theme.palette.tertiary.main,
          width: "calc(100% - 14px)",
          margin: 0,
          ...(styledProp ? { ...styledProp } : {}),
        },
      }}
    >
      {loading ? <LinearProgress color="secondary" /> : <></>}
      <DialogTitle>
        <Box textAlign="right">
          <IconButton onClick={handleClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {handleSave ? (
          <Button
            disabled={loading}
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              fontSize: "12px",
            }}
            onClick={handleSave}
          >
            {saveText}
          </Button>
        ) : (
          <></>
        )}
      </DialogActions>
    </Dialog>
  );
}
