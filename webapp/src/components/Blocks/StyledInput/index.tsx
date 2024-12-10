import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
const DarkInput = styled(TextField)(({ theme }) => ({
  border: "none",
  padding: "0px",
  borderRadius: "4px",
  // "&:after": {
  //   border: "none",
  // },
  // "&:before": {
  //   border: "none",
  // },
  // "&:hover:not(.Mui-disabled):before": {
  //   border: "none",
  //   "-webkit-transition": "unset",
  //   transition: "unset",
  // },
  // "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
  //   border: "none",
  // },
}));
const StyledInput = ({ ...props }) => (
  <DarkInput
    {...props}
    InputProps={{
      style: {
        paddingTop: "0px",
        paddingBottom: "0px",
        "&:hover": {
          border: 'none'
        }
      },
      ...props.inputProps
    }}
  />
);

export default StyledInput;
