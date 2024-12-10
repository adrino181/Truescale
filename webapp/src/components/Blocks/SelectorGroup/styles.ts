import { styled } from "@mui/material/styles";

export const Container = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
  },
  gap: theme.toRem(24),
}));
