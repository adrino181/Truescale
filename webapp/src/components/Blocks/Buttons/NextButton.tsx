import { Button, CircularProgress } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const NextButton = () => (
  <Button
    type="submit"
    sx={{
      margin: "1.5rem 0",
      padding: "5px 5px 5px 10px",
      borderRadius: "4px",
      textTransform: "none",
    }}
    variant="contained"
    color="secondary"
    endIcon={<KeyboardArrowRightIcon />}
    // onClick={handleNext}
  >
    {status === "loading" ? (
      <CircularProgress size={24} sx={{ color: "#FFF" }} />
    ) : (
      "Next"
    )}
  </Button>
);

export default NextButton;
