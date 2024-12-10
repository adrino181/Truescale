import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme, styled } from "@mui/material/styles";

interface DashBoardProp {
  children: React.ReactNode;
}
function NoLayoutContent({ children }: DashBoardProp) {
  const theme = useTheme();
  const [wHeight, setHeight] = useState("100%");
  const containerRef = useRef<HTMLDivElement>(null);
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (window) {
      getHeight();
    }
  }, []);
  const getHeight = () => {
    if (window) {
      const { top } = containerRef.current.getBoundingClientRect();
      const newHeight = window.innerHeight - top + 20;
      setHeight(`${newHeight}px`);
    }
  };
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: theme.palette.primary.main,
        height: "100%",
      }}
    >
      <Container maxWidth="xl" disableGutters ref={containerRef}>
        {children}
      </Container>
    </Box>
  );
}

export default function NoLayout({ children }: DashBoardProp) {
  return (
    <>
      <NoLayoutContent>{children} </NoLayoutContent>
    </>
  );
}
