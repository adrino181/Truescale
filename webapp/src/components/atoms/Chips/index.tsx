import React from "react";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
export type SelectorType = "checkbox" | "radio";
interface ChipInterface {
  [key: string]: unknown | string;
  label: string;
  onChange: (isSelected: boolean) => void;
  isChecked: boolean;
  isDisabled: boolean;
  isRedSelector: boolean;
  type?: SelectorType;
  tabIndex: number;
}

const StyledChip = styled(Chip)<{ isChecked: boolean }>(
  ({ theme, isChecked }) => ({
    background: isChecked
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
  })
);

const Chips: React.FC<ChipInterface> = ({
  label,
  onChange,
  tabIndex,
  isChecked,
}) => (
  <StyledChip
    // defaultStyles={defaultStyles}
    // role={type}
    // aria-checked={isChecked}
    tabIndex={tabIndex}
    // color={
    //   isChecked ? theme.palette.primary.main : theme.palette.secondary.main
    // }
    isChecked={isChecked}
    onClick={() => onChange(!isChecked)}
    label={label}
  />
);

export default Chips;
