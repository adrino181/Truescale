import { styled } from "@mui/material/styles";

interface iConfig {
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  border?: string;
  hoverBackgroundColor?: string;
  hoverColor?: string;
  hoverBorder?: string;
  disabledColor?: string;
  disabledBorder?: string;
  disabledBorderRadius?: string;
  disabledBackgroundColor?: string;
}
const getButton = ({
  color,
  backgroundColor,
  borderRadius,
  border,
  hoverBackgroundColor,
  hoverColor,
  hoverBorder,
  disabledColor,
  disabledBorder,
  disabledBorderRadius,
  disabledBackgroundColor,
}: iConfig) => {
  return {
    color,
    backgroundColor,
    borderRadius,
    border,
    "&:hover:enabled": {
      background: hoverBackgroundColor,
      color: hoverColor,
      border: hoverBorder,
    },
    "&:active:enabled": {
      color,
      backgroundColor,
      borderRadius,
      border,
    },
    "&:focus": {
      boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.1)",
    },
    "&:focus-visible": {
      outline: "none",
    },
    "&:disabled": {
      color: disabledColor,
      border: disabledBorder,
      borderRadius: disabledBorderRadius,
      backgroundColor: disabledBackgroundColor,
    },
  };
};

export const Button = styled("button")<{ variant: string }>(
  ({ variant, theme }) => {
    const commonStyle = {
      display: "flex",
      flexFlow: "row nowrap",
      alignItems: "center",
      justifyContent: "center",
      width: "fit-content",
    };
    // This currently a secondary button
    const baseButton = {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.toRem(400),
    };

    // hover styles
    const hoverStyles = {
      hoverBackgroundColor: theme.palette.primary.main,
      hoverColor: theme.palette.text.primary,
      hoverBorder: `${theme.spacing(1)} solid ${theme.palette.primary.main}`,
    };

    // disabled styles
    const disabledStyles = {
      disabledColor: theme.palette.tertiary.main,
      disabeldBorder: `${theme.toRem(1.5)} solid ${
        theme.palette.tertiary.main
      }`,
      disabledBorderRadius: theme.toRem(400),
      disabledBackgroundColor: theme.palette.text.primary,
    };

    // REBRANDED PRIMARY
    const primary = {
      color: theme.palette.tertiary.main,
      border: `${theme.spacing(1)} solid ${theme.palette.tertiary.main}`,
      borderRadius: theme.toRem(400),
      backgroundColor: theme.palette.text.primary,
    };

    // REBRANDED SECONDARY
    const secondary = {
      color: theme.palette.text.primary,
      border: `1.5px solid ${theme.palette.secondary.main}`,
      borderRadius: theme.toRem(400),
      backgroundColor: theme.palette.secondary.main,
    };

    const saveAndExitBtn = {
      color: theme.palette.tertiary.main,
      backgroundColor: theme.palette.text.primary,
      borderRadius: theme.toRem(25),
      border: `1.5px solid ${theme.palette.secondary.main}`,
    };

    const orangeButton = {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.tertiary.main,
      borderRadius: theme.toRem(6),
      border: "none",
    };

    const tertiary = {
      color: theme.palette.tertiary.main,
      backgroundColor: theme.palette.tertiary.main,
      borderRadius: theme.toRem(25),
      border: "none",
    };
    const primaryOutlined = {
      color: theme.palette.tertiary.main,
      backgroundColor: theme.palette.text.primary,
      borderRadius: theme.toRem(400),
      border: `1px solid ${theme.palette.tertiary.main}`,
    };
    let themedButton = {};
    let additionalProp = {};
    switch (variant) {
      case "link":
        themedButton = {
          color: theme.palette.secondary.main,
          border: "",
          borderRadius: "",
          backgroundColor: "",
        };
        additionalProp = {
          "&": {
            background: "none",
            color: "inherit",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          },
        };
        break;
      case "ProfileCardLink":
        themedButton = {
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: theme.toRem(12),
          backgroundColor: theme.palette.text.primary,
        };
        additionalProp = {
          padding: theme.toRem(12),
          marginRight: theme.toRem(5),
        };
        break;
      case "ProfileListCreateNew":
        themedButton = {
          backgroundColor: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: theme.toRem(12),
          color: theme.palette.text.primary,
        };
        additionalProp = {
          padding: theme.toRem(12),
          marginRight: theme.toRem(5),
        };
        break;
      case "ProfileTypeStart":
        themedButton = {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.tertiary.main,
          borderRadius: theme.toRem(12),
          border: `1px solid ${theme.palette.tertiary.main}`,
        };
        additionalProp = { padding: theme.spacing(2) };
        break;
      case "orange":
        themedButton = {
          ...orangeButton,
        };
        additionalProp = { padding: theme.spacing(2, 3) };
        break;
      case "saveAndExit":
        themedButton = {
          ...saveAndExitBtn,
        };
        additionalProp = {
          padding: theme.spacing(2, 3),
        };
        break;
      case "tertiary":
        themedButton = {
          ...tertiary,
        };
        additionalProp = {
          padding: theme.spacing(2, 3),
        };
        break;
      case "secondary":
        themedButton = {
          ...secondary,
          ...hoverStyles,
          ...disabledStyles,
        };
        additionalProp = {
          padding: theme.spacing(2, 3),
        };
        break;
      case "primary":
        themedButton = {
          ...primary,
          ...hoverStyles,
          ...disabledStyles,
        };
        additionalProp = {
          padding: theme.spacing(2, 3),
        };
        break;
      case "primaryOutline":
        themedButton = {
          ...primaryOutlined,
        };
        additionalProp = {
          padding: theme.spacing(2, 3),
        };
        break;
      default:
        themedButton = { ...baseButton };
        break;
    }
    themedButton = getButton({ ...themedButton });
    themedButton = { ...themedButton, ...additionalProp };
    return themedButton;
  }
);

export const Icon = styled("span")<{ where: "left" | "right" | "center" }>(
  ({ where, theme }) =>
    where !== "center"
      ? {
          margin: theme.spacing(
            0,
            where === "left" ? 2 : 0,
            0,
            where === "right" ? 2 : 0
          ),
        }
      : { margin: theme.spacing(0, "auto") }
);
