import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import { useTheme } from "@mui/material";
import LogoText from "../../svg/logoText.svg";
import { useColor } from "@/components/Blocks/Contexts/ColorModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DrawerTree from "./component/DrawerTree";
import ResponsiveDrawer from "./component/MobileDrawer";
import { useRouter } from "next/router";
import { keyframes } from "@mui/material";
import { StyledLogo } from "./styledLogo";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "space-between",
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {},
}));


const pages = ["Contact Us", "How It Works", "About Us"];

export default function Navbar() {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColor();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const anchorEl = null;
  const router = useRouter();
  const ColorChangeIcon = React.useCallback(() => {
    return (
      <IconButton
        onClick={toggleColorMode}
        sx={{ ml: 1, color: theme.palette.text.primary }}
      >
        <Brightness7Icon />
      </IconButton>
    );
  }, [mode]);

  const LogoItem = React.useCallback(() => {
    return <StyledLogo />;
  }, [mode]);
  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleRequestClose = () => {
    setIsMenuOpen(false);
  };
  return (
    <AppBar
      position="static"
      sx={{
        margin: "auto",
        paddingTop: "20px",
        background: theme.palette.primary.main,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container lg="md">
        <StyledToolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ mr: 2, py: 1, display: { xs: "block", md: "block" } }}>
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <LogoItem />
              </Link>
            </Box>
          </Box>
          <Box
            sx={{ display: { xs: "flex", md: "flex" }, alignItems: "center" }}
          >
            {/* <ResponsiveDrawer />
            <DrawerTree theme={theme} /> */}
            <ColorChangeIcon />
            {/* <Link
              href="/login"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <Chip
                label="Login"
                clickable
                variant="outlined"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "normal",
                  px: 2,
                  borderRadius: "4px",
                  "&:hover": {
                    background:
                      "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)",
                  },
                  background:
                    router.pathname === "/login"
                      ? "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)"
                      : "none",
                  mr: 2,
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
              />
            </Link>
            <Link
              href="/signup"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <Chip
                label="Sign Up"
                clickable
                variant="outlined"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "normal",
                  px: 2,
                  borderRadius: "4px",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)",
                  },
                  background:
                    router.pathname === "/signup"
                      ? "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)"
                      : "none",
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
              />
            </Link> */}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
