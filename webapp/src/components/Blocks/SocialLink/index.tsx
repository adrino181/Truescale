import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Instagram from "@/components/svg/Instagram.svg";
import LinkedIn from "@/components/svg/LinkedIn.svg";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

const SocialLink = () => {
  return (
    <List
      component="div"
      sx={{ display: "flex" }}
      aria-labelledby="social-links"
    >
      <ListItem disablePadding>
        <IconButton
          href="https://www.linkedin.com/company/truescale-in"
          aria-label="Truescale LinkedIn"
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedIn />
        </IconButton>
      </ListItem>
      <ListItem disablePadding>
        <IconButton
          href="https://www.instagram.com/truescale.in"
          aria-label="Truescale Instagram"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Instagram />
        </IconButton>
      </ListItem>
    </List>
  );
};

export default SocialLink;
