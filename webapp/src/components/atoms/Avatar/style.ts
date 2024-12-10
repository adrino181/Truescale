import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export const Wrapper = styled("div")(({ theme }) => ({
  width: "100px",
  height: "100px",
  cursor: "pointer",
  borderRadius: "50%",
  display: "flex",
  justfiyContent: "center",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    width: "100px",
    height: "100px",
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: "50%",
  [theme.breakpoints.up("sm")]: {
    width: 100,
    height: 100,
  },
}));

export const StyledEditIcon = styled(EditRoundedIcon)(({ theme }) => ({
  position: "absolute",
  bottom: -5,
  cursor: "pointer",
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "8px",
  padding: "2px",
  color: "white",
}));
