import React, { Children, useEffect } from "react";
import Navbar from "@/components/Blocks/NavBar";
import Footer from "./Footer";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";

interface AppProps {
  children: React.ReactNode;
}

const WelcomeLayout = ({ children }: AppProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { status, user, profileStatus } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (status === "fulfilled" && profileStatus === "fulfilled") {
      router.push(`/home`);
    }
  }, [status]);
  return (
    <>
      <nav style={{ backgroundColor: theme.palette.primary.main }}>
        <Navbar />
      </nav>
      {/* This content class is important for sticky footer follow index.css */}
      <Container
        className="content"
        sx={{ backgroundColor: theme.palette.primary.main }}
        maxWidth={false}
      >
        {children}
      </Container>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default WelcomeLayout;
