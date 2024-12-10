import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/styles";

const Form = ({ label, theme, items }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: theme.palette.secondary.main,
              },
            }}
          />
        }
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: theme.typography.body2.fontSize,
          },
          color: theme.palette.text.primary,
        }}
        label={label}
      />
    </FormGroup>
  );
};

export default Form;
