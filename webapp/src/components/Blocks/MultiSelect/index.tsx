import Select from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";

const ReactSelect = ({
  selected,
  muiTheme,
  onInputChange,
  onChange,
  promiseOptions,
  colors,
  isMulti,
}) => {
  return (
    <AsyncCreatableSelect
      defaultOptions
      cacheOptions
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,

          ...colors,
        },
      })}
      menuPlacement={"top"}
      placeholder="Tags"
      isMulti={isMulti || false}
      onInputChange={onInputChange}
      onChange={(e) => onChange(e)}
      getOptionLabel={(iObj) => iObj["label"]}
      getOptionValue={(iObj) => iObj["value"]}
      loadOptions={promiseOptions}
      value={selected}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          "&:hover": {
            borderColor: colors["neutral10"],
          },
        }),
      }}
    />
  );
};
export default ReactSelect;
