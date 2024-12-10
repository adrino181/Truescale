import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "20px auto",
  textTransform: "none",
  color: "white",
  background: "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)",
  fontWeight: "500",
}));

export default StyledButton;
