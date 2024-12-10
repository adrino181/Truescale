import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Fade from "@mui/material/Fade";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import SocialLink from "@/components/Blocks/SocialLink";
import Link from "next/link";

export default function DrawerTree({ theme }: { theme: Theme }) {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!Boolean(anchorEl)) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    if (Boolean(anchorEl)) {
      setAnchorEl(null);
    }
  };

  const handleCollapseClick = () => {
    setOpenCollapse(!openCollapse);
  };
  //Groups sorted by tags

  //fetch topics on these tags which have more than 3 likes
  //Industries =>
  //SAAS
  //B2B
  //D2C
  //AgriTech
  // MSME
  // Marketing
  //Web3

  // Homepage -> groups -> group
  // Homepage -> groups -> post
  // Homepage -> what's new -> post
  // Homepage -> tags -> post
  // Homepage -> about us
  // Homepage -> contact us
  // Homepage -> social media
  // Homepage -> post
  // Homepage -> Interviews
  // Homepage -> Success Stories
  // Homepage -> Build In Public
  // Homepage -> What's new
  // Homepage ->

  return (
    <Box
      sx={{
        display: {
          md: "block",
          xs: "none",
        },
      }}
    >
      <Box {...bindHover(popupState)}>
        <Button
          sx={{
            textTransform: "none",
            color: theme.palette.text.primary,
            ["&:hover"]: { color: "white", transform: "rotate(40deg)" },
            padding: 1,
            mr: 2,
          }}
        >
          <WidgetsRoundedIcon />
        </Button>
      </Box>
      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ["& .MuiPaper-root"]: {
            background: theme.palette.primary.main,
            left: 50,
            marginTop: 0,
            width: "50%",
          },
          ["& .MuiMenu-list"]: {
            display: "flex",
            flexDirection: "row",
          },
        }}
      >
        <MenuList>
          <MenuItem component={Link} href="/trending">
            Trending
          </MenuItem>
          <MenuItem component={Link} href="/about-us">
            About Us
          </MenuItem>
          <MenuItem onClick={handleClose}>Groups</MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem onClick={handleClose}>What&apos;s New</MenuItem>
          <MenuItem onClick={handleClose}>Build In Public</MenuItem>
          <MenuItem onClick={handleClose}>Success Stories</MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem onClick={handleClose}>Find CoFounder</MenuItem>
          <MenuItem onClick={handleClose}>Find Jobs</MenuItem>
          <MenuItem onClick={handleClose}>Events</MenuItem>
          <MenuItem onClick={handleClose}>Interviews</MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem onClick={handleClose}>For Publisher</MenuItem>
          <MenuItem onClick={handleClose}>For Partners</MenuItem>
          <MenuItem onClick={handleClose}>For Creators</MenuItem>
          <MenuItem onClick={handleClose}>For Startups</MenuItem>
        </MenuList>
        <SocialLink />
      </HoverMenu>
    </Box>
  );
}
