import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

const spriteUrl =
  "https://truescale-bucket-main.s3.ap-south-1.amazonaws.com/truescale-asset.png";
const commonData = {
  backgroundImage: `url(${spriteUrl})`,
  height: "100px",
  width: "100px",
  marginRight: "10px",
};
const SpriteIcon = {
  earth: {
    ...commonData,
    "background-position-x": "96px",
    "background-position-y": "-118px",
  },
  rocket: {
    ...commonData,
    "background-position-x": "100px",
  },
  connect: {
    ...commonData,
    "background-position-y": "-117px",
  },
};

const JoinUsComponent = () => {
  return (
    <React.Fragment>
      <Typography variant="h1" sx={{ textAlign: "start" }}>
        Join Us &#129311;
      </Typography>
      <List
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
          <ListItemText
            primary="Engage  in Community"
            secondary={
              true ? "Bridge gap between knowledge and entrepreneurs" : null
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <span style={SpriteIcon.earth}></span>
          </ListItemIcon>
          <ListItemText
            primary="Build Business In Public"
            secondary={true ? "Others are doing it, you should also try" : null}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <span style={SpriteIcon.rocket}></span>
          </ListItemIcon>
          <ListItemText
            primary="Free tools and resources"
            secondary={true ? "Blogs, Product page, checkout for more.." : null}
          />
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default JoinUsComponent;
