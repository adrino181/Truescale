import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MainListItem from "./listItems";
import Avatar from "@mui/material/Avatar";
import { logout } from "@/redux/authSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";
import { useColor } from "@/components/Blocks/Contexts/ColorModeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import BottomAppBar from "./component/BottomAppBar";
const drawerWidth: number = 240;
import { useTheme, styled, Theme } from "@mui/material/styles";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import FileManager from "./component/FileManager";
import HotRightNav from "./component/HotRightNav";
import ColdRightNav from "./component/ColdRightNav";
import { keyframes } from "@mui/system";
import dynamic from "next/dynamic";

import { StyledLogo } from "@/components/Blocks/NavBar/styledLogo";
import SkillPreview from "./component/Skill";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
//height in pixels
const TOP_NAVBAR_HEIGHT = 64;
const BOTTOM_NAVBAR_HEIGHT = 48;
const MUI_PADDING_X = 6;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, color }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: color,
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface DashBoardProp {
  children: JSX.Element;
}
function DashboardContent({ children }: DashBoardProp) {
  const [open, setOpen] = useState(false);
  const [active, setIsActive] = useState<string>();
  const [wHeight, setHeight] = useState("100%");
  const { user, status } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  // const isTablet = !isMobile && useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = md && !isMobile;

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { mode, toggleColorMode } = useColor();
  const containerRef = useRef<HTMLDivElement>(null);
  const loading = status === "loading";
  const isLoggedIn = status === "fulfilled";
  const { logout: clearCookies } = useAuth();
  const pathname = router.pathname;
  const hideNavPathElement = ["new-article", "edit"];
  const isNoNavigationPage = hideNavPathElement.includes(
    pathname.split("/")[1]
  );
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useEffect(() => {
    if (window) {
      setIsActive(`${pathname}`);
    }
  }, [pathname]);
  const handleLogout = () => {
    let payload = {};
    dispatch(logout(payload));
    clearCookies();
  };

  const handleWriteArticle = () => {
    router.push(`/new-article`);
  };
  const profileUrl = useMemo(() => {
    return user?.profileImageUrl;
  }, [user]);

  useIsomorphicLayoutEffect(() => {
    if (window) {
      getHeight();
    }
  }, []);

  const getHeight = () => {
    if (window && containerRef.current) {
      const { top } = containerRef.current.getBoundingClientRect();
      const error = (isMobile ? 10 : 0) + (isNoNavigationPage ? 10 : 0);
      const toRemove =
        TOP_NAVBAR_HEIGHT +
        (isNoNavigationPage ? BOTTOM_NAVBAR_HEIGHT : 0) +
        error;
      const newHeight = window.innerHeight - toRemove;
      setHeight(`${theme.toRem(newHeight)}`);
    }
  };

  const ToolBarContainer = useCallback(() => {
    const isPosting = pathname === "/new-article";
    return (
      <Toolbar
        sx={{
          pr: "24px",
          justifyContent: "space-between",
          px: { md: MUI_PADDING_X }, // keeps right padding when drawer closed
        }}
      >
        <Link href={status === "fulfilled" ? "/home" : "/"}>
          <StyledLogo />
        </Link>
        <IconButton
          sx={{ ml: 1, color: theme.palette.text.primary }}
          onClick={toggleColorMode}
        >
          <Brightness7Icon />
        </IconButton>
        <Link href="/profile">
          <Avatar src={profileUrl}>?</Avatar>
        </Link>
      </Toolbar>
    );
  }, [mode, status]);
  const NavPaths = useCallback(() => {
    if (isNoNavigationPage) {
      return <></>;
    }
    return isMobile ? (
      <BottomAppBar active={active} user={user} />
    ) : (
      <Box
        sx={{
          position: "relative",
          background: theme.palette.primary.main,
          height: "100%",
          boxSizing: "content-box",
          padding: "0 10px",
          minWidth: `${drawerWidth}px`,
        }}
      >
        <Divider />
        <List
          component="nav"
          sx={{
            height: "100%",
            marginTop: "100px",
            padding: "10px 10px",
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: "4px",
          }}
        >
          <MainListItem
            handleLogout={handleLogout}
            user={user}
            active={active}
          />
          <Divider sx={{ my: 1 }} />
        </List>
      </Box>
    );
  }, [isMobile, active, open, theme]);
  if (!isLoggedIn) {
    return (
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.primary.main,
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            mt: 4,
            mb: 4,
            overflow: "hidden",
            height: wHeight,
            pl: { md: 0 },
          }}
          ref={containerRef}
        >
          {children}
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        background: theme.palette.primary.main,
        px: { md: MUI_PADDING_X },
      }}
    >
      <AppBar
        position="absolute"
        open={open}
        style={{
          background: theme.palette.primary.main,
        }}
      >
        <ToolBarContainer />
      </AppBar>
      <NavPaths />
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.primary.main,
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Toolbar />
        {loading ? (
          <>
            <LinearProgress color="secondary" />
          </>
        ) : (
          <></>
        )}
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            height: wHeight,
            p: { md: "1rem 1rem" },
          }}
          ref={containerRef}
        >
          {children}
        </Container>
      </Box>
      {!isMobile && !isNoNavigationPage && !isTablet ? (
        <Box>
          <RightNav theme={theme} height={wHeight} />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

const RightNav = ({ theme, height }: { theme: Theme; height: string }) => {
  const router = useRouter();
  const pathName = router.pathname;
  const rightNavArray = ["/new-article", "/", "/[slug]"];
  const isPosting = pathName === "/new-article";
  const isRightNav = rightNavArray.includes(pathName);
  const isProfile = pathName === "/[slug]"
  // if (isProfile) {
  //   return (<Box
  //     sx={{
  //       marginTop: "80px",
  //       minWidth: "350px",
  //     }}
  //   >
  //     <SkillPreview />
  //   </Box>)
  // }
  return (
    <Box
      sx={{
        marginTop: "80px",
        minWidth: "350px",
      }}
    >
      {isPosting ? <FileManager /> : <ColdRightNav maxWidth="300px" />}
    </Box>
  );
};
export default function DrawerNav({ children }: DashBoardProp) {
  return (
    <DashboardContent>{children} </DashboardContent>
  );
}
