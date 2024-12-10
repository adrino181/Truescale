import React from "react";
import * as S from "./styles";
import theme from "@/styles/theme";

export type SelectorType = "checkbox" | "radio";
interface iSelector {
  [key: string]: unknown | string;
  label: string;
  onChange: (isSelected: boolean) => void;
  isChecked: boolean;
  isDisabled: boolean;
  isRedSelector: boolean;
  type?: SelectorType;
  tabIndex: number;
}

const Selector: React.FC<iSelector> = ({
  type = "checkbox",
  label,
  onChange,
  isChecked,
  isDisabled,
  isRedSelector,
  tabIndex,
}) => {
  const borderStyle =
    isChecked && isRedSelector
      ? `2px solid ${theme.palette.text.primary}`
      : isChecked
      ? `2px solid ${theme.palette.primary.eucalyptus}`
      : `2px solid ${theme.palette.neutral.charcoal_20}`;

  const backgroundStyle =
    isChecked && isRedSelector
      ? `${theme.palette.tertiary.clay}`
      : isChecked
      ? `${theme.palette.primary.eucalyptus}`
      : "none";

  const defaultStyles = {
    width: "11.25rem",
    height: "3rem",
    border: borderStyle,
    borderRadius: "14px",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0",
    textAlign: "center" as const,
    backgroundColor: backgroundStyle,
    color: isChecked
      ? `${theme.palette.neutral.white}`
      : `${theme.palette.neutral.onyx}`,
    fontWeight: isChecked ? `bold` : `normal`,
    focusBorder: isRedSelector
      ? `${theme.palette.tertiary.clay}`
      : `${theme.palette.primary.eucalyptus}`,
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
      role={type}
      aria-checked={isChecked}
      tabIndex={tabIndex}
      onClick={selectorChangeHandler}
      aria-disabled={isDisabled}
    >
      <S.SelectorLabel as="body2" defaultLabel={defaultLabel}>
        {label}
      </S.SelectorLabel>
    </S.Container>
  );
};
export default Selector;
