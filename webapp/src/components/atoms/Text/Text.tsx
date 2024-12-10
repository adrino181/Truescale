import React from "react";
import Typography from "@mui/material/Typography";
import * as S from "./style";

interface iOtherProps {
  [key: string]: any;
}

type htmlTextType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
interface iText {
  as?: htmlTextType;
  id?: string;
  children: React.ReactNode;
}

const getElement = (
  as: htmlTextType,
  slot: React.ReactNode,
  otherProps: iOtherProps
) => {
  switch (as) {
    case "label":
      return (
        <Typography variant="h1" {...otherProps}>
          {slot}
        </Typography>
      );
    default:
      return (
        <Typography variant={as} {...otherProps}>
          {slot}
        </Typography>
      );
  }
};

const Text: React.FC<iText & any> = (props) => {
  const { as, id, children, ...rest } = props;
  return <>{getElement(as, children, { ...rest })}</>;
};

export default Text;
