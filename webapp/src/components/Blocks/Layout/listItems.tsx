import { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import { makeStyles, createStyles } from "@mui/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import useTheme from "@mui/styles/useTheme";
import UpgradeModal from "./UpgradeModal";
import PostIcon from "@/components/svg/PostIcon.svg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MessageIcon from "@/components/svg/MessageIcon.svg";
import { colors } from "@/styles/theme";
const useStyles = makeStyles((theme) =>
  createStyles({
    activeLink: {
      display: "block",
      color: theme.palette.text.primary,
      borderRadius: "8px",
      textDecoration: "none",
    },
    normalLink: {
      color: colors['darth']['40'],
      textDecoration: "none",
    },
  })
);

const MainListItem = ({ handleLogout, user, active }) => {
  const username = user?.handle;
  const classes = useStyles();
  const theme = useTheme();
  const [upgradeModalOpen, setUpgradeModal] = useState(false);
  const toggleModal = () => {
    setUpgradeModal((prev) => !prev);
  };
  return (
    <>
      {user ? (
        <>
          <Link
            href={`/home`}
            className={`${active === "/home" ? classes.activeLink : classes.normalLink
              }`}
          >
            <ListItem>
              <ListItemIcon>
                <HomeRoundedIcon
                  style={{
                    color:
                      active === "/home"
                        ? theme.palette.text.primary
                        : colors['darth']['40']
                  }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          {/* <Link */}
          {/*   href="/post-by-you" */}
          {/*   className={`${active === "/post-by-you" */}
          {/*     ? classes.activeLink */}
          {/*     : classes.normalLink */}
          {/*       ? classes.normalLink */}
          {/*       : "" */}
          {/*     }`} */}
          {/* > */}
          {/*   <ListItem> */}
          {/*     <ListItemIcon> */}
          {/*       <PostIcon */}
          {/*         style={{ */}
          {/*           stroke: */}
          {/*             active === "/post-by-you" */}
          {/*               ? theme.palette.text.primary */}
          {/*               : colors['darth']['40'], */}
          {/*           fill: */}
          {/*             active === "/post-by-you" */}
          {/*               ? theme.palette.text.primary */}
          {/*               : colors['darth']['40'] */}
          {/*         }} */}
          {/*       /> */}
          {/*     </ListItemIcon> */}
          {/*     <ListItemText primary="Post By You" /> */}
          {/*   </ListItem> */}
          {/* </Link> */}
          {/* <Link */}
          {/*   href="/messages" */}
          {/*   className={`${active === "/messages" */}
          {/*     ? classes.activeLink */}
          {/*     : classes.normalLink */}
          {/*       ? classes.normalLink */}
          {/*       : "" */}
          {/*     }`} */}
          {/* > */}
          {/*   <ListItem> */}
          {/*     <ListItemIcon> */}
          {/*       <MessageIcon */}
          {/*         style={{ */}
          {/*           fill: */}
          {/*             active === "/messages" */}
          {/*               ? theme.palette.text.primary */}
          {/*               : colors['darth']['40'] */}
          {/*         }} */}
          {/*       /> */}
          {/*     </ListItemIcon> */}
          {/*     <ListItemText primary="Messages" /> */}
          {/*   </ListItem> */}
          {/* </Link> */}
          {/* <Link */}
          {/*   href="/notifications" */}
          {/*   className={`${active === "/notifications" */}
          {/*     ? classes.activeLink */}
          {/*     : classes.normalLink */}
          {/*       ? classes.normalLink */}
          {/*       : "" */}
          {/*     }`} */}
          {/* > */}
          {/*   <ListItem> */}
          {/*     <ListItemIcon> */}
          {/*       <NotificationsNoneIcon */}
          {/*         style={{ */}
          {/*           color: */}
          {/*             active === "/notifications" */}
          {/*               ? theme.palette.text.primary */}
          {/*               : colors['darth']['40'] */}
          {/*         }} */}
          {/*       /> */}
          {/*     </ListItemIcon> */}
          {/*     <ListItemText primary="Notification" /> */}
          {/*   </ListItem> */}
          {/* </Link> */}
          {/* <Link */}
          {/*   href="/analytics" */}
          {/*   className={`${active === "/analytics" */}
          {/*     ? classes.activeLink */}
          {/*     : classes.normalLink */}
          {/*       ? classes.normalLink */}
          {/*       : "" */}
          {/*     }`} */}
          {/* > */}
          {/*   <ListItem> */}
          {/*     <ListItemIcon> */}
          {/*       <TrendingUpIcon */}
          {/*         style={{ */}
          {/*           color: */}
          {/*             active === "/analytics" */}
          {/*               ? theme.palette.text.primary */}
          {/*               : colors['darth']['40'] */}
          {/*         }} */}
          {/*       /> */}
          {/*     </ListItemIcon> */}
          {/*     <ListItemText primary="Analytics" /> */}
          {/*   </ListItem> */}
          {/* </Link> */}
          <Link
            href={`@${username}`}
            className={`${active === "/[slug]"
              ? classes.activeLink
              : classes.normalLink
                ? classes.normalLink
                : ""
              }`}
          >
            <ListItem>
              <ListItemIcon>
                <PersonRoundedIcon
                  style={{
                    color:
                      active === "/[slug]"
                        ? theme.palette.text.primary
                        : colors['darth']['40']
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutRoundedIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" sx={{ color: "red" }} />
          </ListItemButton>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://truescale-v2.s3.ap-south-1.amazonaws.com/tubelight.png"
              height="160"
              width="160"
            />
          </div>
          {/* <ListItem> */}
          {/*   <ListItemButton */}
          {/*     sx={{ */}
          {/*       background: theme.palette.secondary.main, */}
          {/*       color: "white", */}
          {/*       paddingLeft: "2rem", */}
          {/*     }} */}
          {/*     onClick={toggleModal} */}
          {/*   > */}
          {/*     <ListItemIcon */}
          {/*       sx={{ */}
          {/*         display: "flex", */}
          {/*         alignItems: "center", */}
          {/*         justifyContent: "center", */}
          {/*         mx: -1, */}
          {/*         marginBottom: "-0.3rem", */}
          {/*       }} */}
          {/*     > */}
          {/*       <img */}
          {/*         src="https://truescale-v2.s3.ap-south-1.amazonaws.com/assets/diamond.png" */}
          {/*         height="30" */}
          {/*         width="30" */}
          {/*       /> */}
          {/*     </ListItemIcon> */}
          {/*     <ListItemText primary="Upgrade" sx={{ color: "white" }} /> */}
          {/*   </ListItemButton> */}
          {/* </ListItem> */}
          {/* <UpgradeModal open={upgradeModalOpen} handleClose={toggleModal} /> */}
          {/* <ListItemText primary="Upgrade" /> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default MainListItem;
