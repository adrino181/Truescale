import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Link from "next/link";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <MenuList>
        <MenuItem component={Link} href="/trending">
          Trending
        </MenuItem>
        <MenuItem component={Link} href="/about-us">
          About Us
        </MenuItem>
        <MenuItem>Groups</MenuItem>
      </MenuList>
      <Divider />
      <MenuList>
        <MenuItem>What&apos;s New</MenuItem>
        <MenuItem>Build In Public</MenuItem>
        <MenuItem>Success Stories</MenuItem>
      </MenuList>
      <Divider />
      <MenuList>
        <MenuItem>Find CoFounder</MenuItem>
        <MenuItem>Find Jobs</MenuItem>
        <MenuItem>Events</MenuItem>
        <MenuItem>Interviews</MenuItem>
      </MenuList>
      <Divider />
      <MenuList>
        <MenuItem>For Publisher</MenuItem>
        <MenuItem>For Partners</MenuItem>
        <MenuItem>For Creators</MenuItem>
        <MenuItem>For Startups</MenuItem>
      </MenuList>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          mr: 2,
          display: { sm: "none" },
          ["&:hover"]: { color: "white", transform: "rotate(40deg)" },
        }}
      >
        <WidgetsRoundedIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
