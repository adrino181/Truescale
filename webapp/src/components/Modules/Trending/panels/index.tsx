import Trending from "./feed";
import PeopleFeed from "./people"
import GroupFeed from "./group"
import EventFeed from "./event"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <TabPanelDiv
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { md: [2], xs: 0 } }}>{children}</Box>}
    </TabPanelDiv>
  );
}


const TabPanelDiv = styled(`div`)((theme) => ({
  overflowY: "hidden"
}))

const Panels = ({ value, handleModal }) => {

  return (
    <>
      <TabPanel value={value} index={0} >
        <Trending handleModal={handleModal} />
      </TabPanel >
      {/* <TabPanel value={value} index={1} sx={{ overflowY: "hidden" }}> */}
      {/*   <EventFeed handleModal={handleModal} /> */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={2} sx={{ overflowY: "hidden" }}> */}
      {/*   <GroupFeed handleModal={handleModal} /> */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={3} sx={{ overflowY: "hidden" }}> */}
      {/*   <PeopleFeed handleModal={handleModal} /> */}
      {/* </TabPanel> */}
    </>
  )
}
export default Panels; 
