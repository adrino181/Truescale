import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@mui/system/styled";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Box";
import Link from "next/link";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import IconButton from "@mui/material/IconButton";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useColor } from "../Contexts/ColorModeContext";
import CreateGroupModal from "@/components/Modules/Group/create-group-modal";
import PersonCard from "@/components/Blocks/Cards/personCard";
type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { md: [2], xs: 0 } }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    color: theme.palette.text.primary,
  },
  color: "lightGrey",
  textTransform: "none",
}));

export default function BasicTabs({ children, filter, theme }) {
  const [value, setValue] = React.useState(0);
  const [toggleFilter, setToggleFilter] = React.useState(true);
  const [guildModal, setGuildModal] = React.useState(false);
  const { mode } = useColor();
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleGuildModal = () => {
    setGuildModal((prev) => !prev);
  };

  const handleWriteArticle = () => {
    router.push(`/new-article`);
  };

  const handleCreateGroup = () => {
    router.push("/group/create-group");
  };

  const RenderTabButton = React.useCallback(() => {
    if (value === 0) {
      return (
        <Button
          color="inherit"
          component={Link}
          prefetch={false}
          href="/new-article"
          sx={{
            background:
              "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)",
            color: theme.palette.text.tertiary,
            textTransform: "none",
            marginRight: "20px",
          }}
        >
          New Post
        </Button>
      );
    }

    if (value === 1) {
      return (
        <Button
          color="inherit"
          onClick={toggleGuildModal}
          sx={{
            background:
              "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)",
            textTransform: "none",
            marginRight: "20px",
          }}
        >
          Create Guild
        </Button>
      );
    }

    if (value === 2) {
      return (
        <Button
          color="inherit"
          onClick={handleCreateGroup}
          sx={{
            background:
              mode === "dark"
                ? "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)"
                : theme.palette.primary.main,
            textTransform: "none",
            marginRight: "20px",
          }}
        >
          Add Event
        </Button>
      );
    }
  }, [value, mode]);

  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };
  return (
    <>
      <Container
        sx={{
          position: "sticky",
          top: "-5px",
          background: theme.palette.primary.main,
          zIndex: "3",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2px 10px 2px 10px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tabs to navigate between"
          >
            <StyledTab label="General" {...a11yProps(0)} />
            <StyledTab label="Guilds" {...a11yProps(1)} />
            <StyledTab label="Events" {...a11yProps(2)} />
            <StyledTab label="People" {...a11yProps(3)} />
          </Tabs>
        </Box>
        {toggleFilter ? filter : <></>}
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <ToggleBtn handleClick={handleToggleFilter} isOpen={toggleFilter} />
          <RenderTabButton />
        </Box>
      </Container>
      <CreateGroupModal open={guildModal} handleClose={toggleGuildModal} />
      <TabPanel value={value} index={0}>
        {children}
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={3}>
        <PersonCard />
      </TabPanel>
    </>
  );
}

const ToggleBtn = ({ handleClick, isOpen }) => {
  return (
    <IconButton
      color="secondary"
      onClick={handleClick}
      aria-label="toogle filter"
    >
      {isOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
    </IconButton>
  );
};
