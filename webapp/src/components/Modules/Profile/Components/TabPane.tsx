import { Box } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import PostCard from "@/components/Blocks/Cards/postCard";
import dynamic from "next/dynamic";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Chip from "@mui/material/Chip";
import { iconMapping } from "@/components/Blocks/FormBuilder/Field/Field";
const Analytics = dynamic(import("@/components/Modules/Analytics/"), {
  ssr: false,
});
function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
    </div>
  );
};

const TabPane = ({ activeTab, setActiveTab, profile, posts }) => {
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={(e, value) => setActiveTab(value)}
          aria-label="profile-tabs"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<PersonOutlineOutlinedIcon />} {...a11yProps(0)} />
          <Tab icon={<TableChartOutlinedIcon />} {...a11yProps(1)} />
          <Tab icon={<TrendingUpIcon />} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={0} index={activeTab}>
        <Container sx={{ paddingTop: "20px" }}>
          <Typography fontSize="16px" color="textPrimary">
            About Me
          </Typography>
          <Typography fontSize="16px" color="textSecondary" padding=" 0">
            {profile.bio}
          </Typography>
          <Box sx={{ px: 0, mt: 2 }}>
            <Typography>Interest</Typography>
            {profile?.interest?.map((item) => (
              <Chip
                key="item"
                color="secondary"
                sx={{ mr: 1 }}
                label={`#${item}`}
              ></Chip>
            ))}
          </Box>
          <Box sx={{ px: 0, mt: 2 }}>
            <Typography>Industry</Typography>
            {profile?.industry?.map((item) => (
              <Chip
                key="item"
                color="secondary"
                sx={{ mr: 1 }}
                label={`#${item}`}
              ></Chip>
            ))}
          </Box>
          <Box sx={{ px: 0, mt: 2 }}>
            <Typography>Socials</Typography>
            {profile?.industry?.map((item) => (
              <Chip
                key="item"
                color="secondary"
                sx={{ mr: 1 }}
                label={`#${item}`}
              ></Chip>
            ))}
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={1} index={activeTab}>
        <h1>My Post</h1>
        {profile && posts ? (
          posts.map((post, index) => (
            <Box key={post?.id || index} sx={{ paddingTop: "10px" }}>
              <PostCard post={post} />
            </Box>
          ))
        ) : (
          <></>
        )}
      </TabPanel>
      <TabPanel value={2} index={activeTab} sx={{ p: 0 }}>
        <Analytics />
      </TabPanel>
    </Container>
  );
};

export default TabPane;
