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
import { useColor } from "@/components/Blocks/Contexts/ColorModeContext";
import dynamic from "next/dynamic";

const CreateGroupModal = dynamic(
  import("@/components/Modules/Group/create-group-modal"),
  {
    ssr: false,
  }
);

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
  padding: 0,
}));

export default function BasicTabs({ children, filter, theme, value, handleTabChange }) {
  const [guildModal, setGuildModal] = React.useState(false);
  const { mode } = useColor();
  const router = useRouter();
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
    return <></>
  }, [value, mode]);

  const [toggleFilter, setToggleFilter] = React.useState(true);
  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };
  return (
    <>
      <Container
        sx={{
          background: theme.palette.primary.main,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="Tabs to navigate between"
        >
          <StyledTab label="General" {...a11yProps(0)} />
          {/* <StyledTab label="Guilds" {...a11yProps(1)} /> */}
          {/* <StyledTab label="Events" {...a11yProps(2)} /> */}
          {/* <StyledTab label="People" {...a11yProps(3)} /> */}
        </Tabs>
        {/* {toggleFilter ? filter : <></>} */}
        {/* <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}> */}
        {/*   <ToggleBtn handleClick={handleToggleFilter} isOpen={toggleFilter} /> */}
        {/*   <RenderTabButton /> */}
        {/* </Box> */}
      </Container>
      {/* <CreateGroupModal open={guildModal} handleClose={toggleGuildModal} /> */}
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
