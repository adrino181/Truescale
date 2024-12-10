import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const CheckBoxControl = ({ theme, items, onChange }) => {
  return (
    <FormGroup>
      {(items || []).map((item) => (
        <FormControlLabel
          key={item.code}
          control={
            <Checkbox
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: theme.palette.secondary.main,
                },
              }}
              value={item.value}
              onChange={onChange}
            />
          }
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: theme.typography.body2.fontSize,
            },
            color: theme.palette.text.primary,
          }}
          label={item.label}
        />
      ))}
    </FormGroup>
  );
};

export default CheckBoxControl;
