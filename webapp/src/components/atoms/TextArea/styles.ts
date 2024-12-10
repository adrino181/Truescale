import { styled } from "@mui/material/styles";

export const TextArea = styled("textarea")<{ width?: number | string }>(
  ({ theme }) => ({
    padding: "14px 16px",
    border: `1px solid ${theme.palette.inputColor.main}`,
    borderRadius: theme.shape.borderRadius,
    "&:focus-visible": {
      outline: "none",
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRaidus: theme.shape.borderRadius,
      boxShadow: `0 0 0 3px rgba(252, 183, 81, 0.5)`,
    },
  })
);
