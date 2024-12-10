import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";
import { Field } from "formik";

export default function RadioGroupControl({
  theme,
  onChange,
  value,
  items,
  label,
  name,
}) {
  return (
    <>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          <Typography variant="h5" sx={{ mt: 2 }} color="text.primary">
            {label}
          </Typography>
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name={name}
          onChange={onChange}
          value={value}
        >
          {(items || []).map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: theme.palette.secondary.main,
                    },
                  }}
                />
              }
              label={item.label}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: theme.typography.body2.fontSize,
                },
                color: theme.palette.text.primary,
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}
