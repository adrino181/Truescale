import React from "react";
import * as S from "./styles";
import { defaultConfig as theme } from "@/components/themes";

interface iDeselector {
  [key: string]: unknown | string;
  label: string;
  onChange: (isSelected: boolean) => void;
  isChecked: boolean;
  isDisabled: boolean;
}

const Deselector: React.FC<iDeselector> = ({
  label,
  onChange,
  isChecked,
  isDisabled,
}) => {
  const defaultStyles = {
    width: "fit-content",
    height: "1.75rem",
    border: isChecked
      ? `2px solid ${theme.palette.primary.eucalyptus}`
      : `2px solid ${theme.palette.neutral.charcoal_20}`,
    borderRadius: "14px",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2rem",
    textAlign: "center" as const,
    backgroundColor: isChecked ? `${theme.palette.primary.eucalyptus}` : "none",
    color: isChecked
      ? `${theme.palette.neutral.white}`
      : `${theme.palette.neutral.onyx}`,
  };

  const selectorChangeHandler = () => {
    if (!isDisabled) {
      onChange(!isChecked);
    }
  };

  const defaultLabel = {
    color: isChecked
      ? `${theme.palette.neutral.white}`
      : `${theme.palette.neutral.onyx}`,
  };

  return (
    <S.Container
      defaultStyles={defaultStyles}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onClick={selectorChangeHandler}
      aria-disabled={isDisabled}
    >
      <S.DeselectorLabel as="body2" defaultLabel={defaultLabel}>
        {label.toUpperCase()}
      </S.DeselectorLabel>
      <S.CrossIcon />
    </S.Container>
  );
};
export default Deselector;
