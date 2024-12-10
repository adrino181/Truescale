import { Button, CircularProgress } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const NextButton = () => (
  <Button
    type="submit"
    sx={{
      margin: "1.5rem 0",
      padding: "5px 5px 5px 10px",
      borderRadius: "4px",
    }}
    variant="contained"
    color="secondary"
    endIcon={<KeyboardArrowRightIcon />}
    // onClick={handleNext}
  >
    Next
  </Button>
);

export default NextButton;
