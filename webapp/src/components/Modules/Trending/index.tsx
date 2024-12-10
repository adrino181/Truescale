import React from "react";
import BasicTabs from "./components/tabs";
import FilterTag from "./components/filter";
import Panels from "./panels";
import useTheme from "@mui/styles/useTheme";
import ModalAdapter from "./modal";
export const Trending = () => {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleTabChange = (e, newValue) => {
    setValue(newValue)
  }
  const handleFilterChange = (filterType: TabFilters) => {
  }
  const handleModalOpen = () => {
    setOpen(true);
  }
  const handleModalClose = () => {
    setOpen(false);
  }
  return (
    <>
      {/* <BasicTabs value={value} handleTabChange={handleTabChange} filter={<FilterTag />} theme={theme}> */}
      {/* </BasicTabs> */}
      <Panels value={value} handleModal={handleModalOpen} />
      <ModalAdapter value={value} open={open} theme={theme} handleClose={handleModalClose} />
    </>
  );
};

export default Trending;
