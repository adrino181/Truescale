import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import theme from "@/styles/theme";

const spriteUrl =
  "https://truescale-v2.s3.ap-south-1.amazonaws.com/sprite-social.png";
const commonData = {
  backgroundImage: `url(${spriteUrl})`,
  height: "42px",
  width: "42px",
  marginRight: "10px",
};
const SpriteIcon = {
  facebook: {
    ...commonData,
    "background-position-x": "-55px",
    "background-position-y": "-45px",
  },
  twitter: {
    ...commonData,
    "background-position-y": "-46px",
  },
  snapchat: {},
  whatsapp: {
    ...commonData,
    "background-position-x": "100px",
  },
  discord: {},
  linkedin: {
    ...commonData,
    "background-position-y": "-91px",
    "background-position-x": "99px",
  },
  tumblr: {},

  share: {
    ...commonData,
    "background-position-y": "-181px",
  },
};

const ShareComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Typography
          color="secondary"
          sx={{ textDecoration: "underline" }}
          variant="body2"
        >
          Share
        </Typography>
        <IconButton
          id="share-btn"
          aria-controls={open ? "social-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <span style={SpriteIcon.share}></span>
        </IconButton>
        <Menu
          id="social-menu"
          MenuListProps={{
            "aria-labelledby": "social-menu",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          variant="selectedMenu"
          sx={{
            ".MuiMenu-paper": {
              background: "none",
            },
          }}
        >
          <Paper sx={{ background: theme.palette.tertiary.main }}>
            <MenuList
              sx={{
                display: "flex",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.twitter}></span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.facebook}></span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.linkedin}></span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.whatsapp}></span>
                </ListItemIcon>
              </MenuItem>
            </MenuList>
            {/* <MenuList
              sx={{
                display: "flex",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.share}></span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.share}></span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.share}></span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.share}></span>
                </ListItemIcon>
              </MenuItem>
            </MenuList>
            <MenuList
              sx={{
                display: "flex",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.share}></span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.share}></span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.share}></span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <span style={SpriteIcon.share}></span>
                </ListItemIcon>
              </MenuItem>
            </MenuList> */}
          </Paper>
        </Menu>
      </div>
      {/* <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "trasparent",
        }}
      >
        <ListItem alignItems="center">
          <ListItemIcon>
            <span style={SpriteIcon.connect}></span>
          </ListItemIcon>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <span style={SpriteIcon.earth}></span>
          </ListItemIcon>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <span style={SpriteIcon.rocket}></span>
          </ListItemIcon>
        </ListItem>
      </List> */}
    </React.Fragment>
  );
};

export default ShareComponent;
