import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddPost from "@/components/svg/AddPost.svg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Link from "next/link";
import StyledButton from "@/components/Blocks/Buttons/StyledGradiantBtn";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MessageIcon from "@/components/svg/MessageIcon.svg";
import { colors } from "@/styles/theme";

export default function BottomAppBar({ active, user }) {
  const username = user?.handle;
  const theme = useTheme();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: theme.palette.primary.main }}
      >
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          {user ? (
            <>
              <IconButton
                component={Link}
                color="inherit"
                aria-label="open drawer"
                size="large"
                href={`/home`}
              >
                <HomeRoundedIcon
                  style={{
                    color: active === "/home"
                      ? theme.palette.text.primary
                      : colors['darth']['40'],
                  }}
                />
              </IconButton>
              <IconButton
                component={Link}
                color="inherit"
                aria-label="open drawer"
                size="large"
                href={`/trending`}
              >
                <TrendingUpIcon
                  style={{
                    color: active === "/trending"
                      ? theme.palette.text.primary
                      : colors['darth']['40'],
                  }}
                />
              </IconButton>
              <IconButton
                color="inherit"
                sx={{
                  border: "3px solid",
                  borderColor: theme.palette.secondary.main,
                }}
                size="large"
                href="new-article"
                component={Link}
              >
                <AddPost style={{ fill: theme.palette.text.primary }} />
              </IconButton>
              {/* <IconButton */}
              {/*   component={Link} */}
              {/*   color="inherit" */}
              {/*   aria-label="open drawer" */}
              {/*   size="large" */}
              {/*   href={`/notifications`} */}
              {/* > */}
              {/*   <NotificationsNoneIcon */}
              {/*     style={{ */}
              {/*       color: active === "/[...slug]" ? "white" : "#586173", */}
              {/*     }} */}
              {/*   /> */}
              {/* </IconButton> */}
              <IconButton
                component={Link}
                color="inherit"
                aria-label="messages"
                size="large"
                href={`/messages`}
              >
                <MessageIcon
                  style={{
                    fill:
                      active === "/messages"
                        ? theme.palette.text.primary
                        : colors['darth']['40']
                  }}
                />
              </IconButton>
              <IconButton
                component={Link}
                href={`/@${username}`}
                color="inherit"
                size="large"
              >
                <PersonRoundedIcon
                  style={{
                    color: active === "/[slug]"
                      ? theme.palette.text.primary
                      : colors['darth']['40']
                    ,
                  }}
                />
              </IconButton>
            </>
          ) : (
            <>
              <StyledButton
                component={Link}
                href="/signup"
                color="inherit"
                size="large"
                sx={{ width: "100%" }}
              >
                {" "}
                Join Us
              </StyledButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
