import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { useRouter } from "next/router";
const BackButton = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <IconButton color="secondary" onClick={goBack} aria-label="toogle filter">
      <KeyboardBackspaceRoundedIcon />
    </IconButton>
  );
};

export default BackButton;
