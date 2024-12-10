import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const FilterTag = ({
  // filterTags,
}) => {
  let filterItem = {};
  return (
    <>
      <Tabs
        // value={value}
        // onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        allowScrollButtonsMobile
        sx={{ minHeight: '50px', alignItems: "center", padding: 0 }}
      >
        <Chip
          label="Most Recent"
          onClick={() => {
            console.log("3");
          }}
        />
        <Chip
          label="Following"
          variant="outlined"
          onClick={() => {
            console.log("3");
          }}
        />
        <Chip
          label="Trending"
          variant="outlined"
          onClick={() => {
            console.log("3");
          }}
        />
        {/* <> */}
        {/*   <Tab label="Item One" /> */}
        {/*   <Tab label="Item Two" /> */}
        {/*   <Tab label="Item Three" /> */}
        {/*   <Tab label="Item Four" /> */}
        {/*   <Tab label="Item Five" /> */}
        {/*   <Tab label="Item Six" /> */}
        {/*   <Tab label="Item Seven" /> */}
        {/* </> */}
      </Tabs>
    </>
  );
};

export default FilterTag;
