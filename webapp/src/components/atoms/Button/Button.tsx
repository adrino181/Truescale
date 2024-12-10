import React, { Dispatch, SetStateAction } from "react";
import * as S from "./styles";
import { default as MuiBtn } from "@mui/material/Button";

type BtnType = "submit" | "reset" | "button";
interface iButton {
  variant: string;
  callback?:
    | (() => void)
    | null
    | ((values: Record<string, any>) => Promise<any>)
    | Dispatch<SetStateAction<any>>;
  label?: string;
  withIcon?: {
    icon: JSX.Element;
    where: "left" | "right" | "center";
  };
  type?: string;
  classnames?: string;
  disabled?: boolean;
}

const Button: React.FC<iButton> = ({
  variant = "primary",
  callback,
  label,
  withIcon,
  type = "button",
  classnames = "",
  disabled = false,
}) => {
  return (
    <MuiBtn
      sx={{
        margin: "1.5rem 0",
        padding: "5px 5px 5px 10px",
        borderRadius: "4px",
        textTransform: "none",
      }}
      variant="contained"
      color="secondary"
      onClick={callback ? callback : () => {}}
      //endIcon={}
      // onClick={handleNext}
    >
      {withIcon?.where === "left" && (
        <S.Icon where="left">{withIcon.icon}</S.Icon>
      )}
      {label}
      {withIcon?.where === "right" && (
        <S.Icon where="right">{withIcon.icon}</S.Icon>
      )}
      {withIcon?.where === "center" && (
        <S.Icon where="center">{withIcon.icon}</S.Icon>
      )}
    </MuiBtn>
    // {<S.Button
    // 	variant={variant}
    // 	onClick={callback ? callback : () => {}}
    // 	type={type as BtnType}
    // 	className={classnames}
    // 	{...(disabled && { disabled: disabled })}
    // >
    // 	{withIcon?.where === 'left' && (
    // 		<S.Icon where="left">{withIcon.icon}</S.Icon>
    // 	)}
    // 	{label}
    // 	{withIcon?.where === 'right' && (
    // 		<S.Icon where="right">{withIcon.icon}</S.Icon>
    // 	)}
    // 	{withIcon?.where === 'center' && (
    // 		<S.Icon where="center">{withIcon.icon}</S.Icon>
    // 	)}
    // </S.Button>}
  );
};

export default Button;
