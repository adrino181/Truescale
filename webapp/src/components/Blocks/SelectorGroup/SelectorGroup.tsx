import React, { useState } from "react";

import * as S from "./styles";
import { useFormikContext, FormikContextType } from "formik";
import Chips from "@/components/atoms/Chips";

type label = "label";
type value = "value";
interface iSelectorGroup {
  maxSelection?: number;
  isYesNoSelection?: boolean;
  selectors: Record<string, string | number>[];
  onSelectorChange: (selectedValues: any[]) => void;
  formikName?: string;
  initialValues?: string[];
}

const SelectorGroup: React.FC<iSelectorGroup> = ({
  maxSelection,
  isYesNoSelection,
  selectors,
  onSelectorChange,
  formikName,
  initialValues,
}) => {
  const formik: FormikContextType<any> = useFormikContext();
  const selectedArray: any = selectors.map((selector, index) => {
    let isChecked = (initialValues || []).some(
      (item) => item === selector.value
    );
    return { ...selector, checked: isChecked };
  });

  const [selected, setSelected] = useState(selectedArray);

  const handleSelection = (index: number, isSelected: boolean) => {
    const checkedCount = selected.filter(
      (item: any) => item.checked === true
    ).length;
    const updatedCheckboxes = selected.map((item: any, i: number) => {
      if (i === index) {
        item.checked = isSelected;
      }
      return item;
    });
    if (isYesNoSelection && formikName)
      formik.setFieldValue(formikName, isSelected ? selectors[index] : "");
    else if (formikName == "tags") {
      let tags: any[] = formik.values.tags?.length ? formik.values.tags : [];
      if (isSelected) tags.push(selectors[index]);
      else tags = tags.filter((tag) => tag !== selectors[index]);
      formik.setFieldValue(formikName, tags);
    }
    if (
      maxSelection !== undefined &&
      checkedCount >= maxSelection &&
      !selected[index].checked &&
      isSelected
    ) {
      return;
    }

    setSelected(updatedCheckboxes);
    const filteredSelectors: any = updatedCheckboxes
      .filter((item: any) => {
        if (item.checked === true) {
          return item;
        }
      })
      .map((filteredSelector: any) => filteredSelector.value);

    onSelectorChange(filteredSelectors);
  };

  const isCheckboxDisabled = (index: number): boolean => {
    const checkedCount = selected.filter(
      (item: any) => item.checked === true
    ).length;

    if (
      maxSelection !== undefined &&
      checkedCount >= maxSelection &&
      !selected[index].checked
    ) {
      return true;
    }

    return false;
  };

  const getTabIndex = (index: number) => {
    if (!isYesNoSelection) {
      return 0;
    } else {
      if (index === 0 && !selected[index].checked) {
        return 0;
      } else {
        if (selected[index]) {
          return 0;
        } else {
          return -1;
        }
      }
    }
  };

  return (
    <S.Container {...(isYesNoSelection && { role: "radiogroup" })}>
      {selectors.map((selector, index) => (
        <Chips
          type={isYesNoSelection ? "radio" : "checkbox"}
          key={selector.label}
          label={selector.label as string}
          isChecked={selected[index].checked}
          isDisabled={isCheckboxDisabled(index)}
          onChange={(isChecked) => handleSelection(index, isChecked)}
          isRedSelector={
            isYesNoSelection !== undefined &&
            isYesNoSelection &&
            String(selector.label).toLowerCase().includes("no")
          }
          tabIndex={getTabIndex(index)}
        />
      ))}
    </S.Container>
  );
};
export default SelectorGroup;
