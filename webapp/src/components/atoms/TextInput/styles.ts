import { styled } from "@mui/material/styles";
import Text from "../Text/Text";

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  "& span": {
    right: 0,
    position: "absolute",
    bottom: 20,
  },
}));

export const MainInputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(0, 2, 0, 3),
  fontSize: theme.toRem(12),
  outline: `${theme.toRem(1)} solid ${theme.palette.secondary.main}`,
  border: `${theme.toRem(1)} solid ${theme.palette.secondary.main}`,
  borderRaius: theme.toRem(8),
  "&:focus-within": {
    boxShadow: `0 0 0 ${theme.toRem(8)} ${theme.palette.tertiary.main}`,
    outline: `${theme.toRem(1)} solid ${theme.palette.tertiary.main}`,
    border: `${theme.toRem(1)} solid ${theme.palette.tertiary.main}`,
  },
}));

export const MainInput = styled("input")(({ theme }) => ({
  flex: 1,
  textOverflow: "ellipsis",
  padding: theme.spacing(3),
  fontSize: theme.toRem(16),
  outline: 0,
  border: 0,
}));

export const MandatoryContainerRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.error.main,
}));

export const MandatoryText = styled(Text)(({ theme }) => ({
  padding: 0,
  marginLeft: theme.spacing(1),
  color: theme.palette.error.main,
}));

export const SuccessContainerRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

export const SuccessText = styled("span")(({ theme }) => ({
  "& p": {
    padding: 0,
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: theme.toRem(12),
  },
}));

export const RulesTextContainer = styled("div")(({ theme }) => ({
  "& ul": {
    padding: theme.spacing(0, 0, 0, 4),
    margin: theme.spacing(1),
  },
}));

export const EyeIconContainer = styled("div")(({ theme }) => ({
  cursor: "pointer",
  margin: theme.spacing(0, 2, 0, 2),
  color: theme.palette.text.primary,
}));
