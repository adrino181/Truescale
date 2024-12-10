import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const StyledHeading = styled(Typography)(({ theme }) => ({
  padding: "1rem 0",
  fontSize: "3.5rem",
  fontWeight: "500",
  "& .mainHeadingMisc": {
    color: theme.palette.secondary.main,
  },
}));

const TextArray = ["Innovate...", "Disrupt...", "Succeed..."];
const TypedAnimation = () => {
  const headingRef = useRef<HTMLInputElement>(null);
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(TextArray[0]);
  const [index, setIndex] = useState(0);
  const [countState, setCountState] = useState(1);
  useIsomorphicLayoutEffect(() => {
    if (
      window &&
      countState >= TextArray.length &&
      -fullText.length - 1 === index
    ) {
      clearInterval(headingRef.current);
      setCountState(1);
      setIndex(0);
      setText("");
      setFullText(TextArray[0]);
    }

    if (window && index === fullText.length) {
      clearInterval(headingRef.current);
      setIndex(-1);
    }

    if (window && index >= 0 && index < fullText.length) {
      headingRef.current = setTimeout(() => {
        performCreation();
      }, 150);
    }
    if (index === -fullText.length - 1 && countState < TextArray.length) {
      clearInterval(headingRef.current);
      setCountState(countState + 1);
      setFullText(TextArray[countState]);
      setIndex(0);
    }

    if (window && index < 0 && index > -fullText.length - 1) {
      clearInterval(headingRef.current);
      headingRef.current = setTimeout(() => {
        performDecrement();
      }, 150);
    }

    return () => {
      if (headingRef.current) {
        clearInterval(headingRef.current);
      }
    };
  }, [index]);

  const performDecrement = () => {
    let newText = text;
    setText(newText.slice(0, -1));
    setIndex(index - 1);
  };
  const performCreation = () => {
    setText(text + fullText[index]);
    setIndex(index + 1);
  };

  return (
    <Box style={{ minHeight: "100px" }}>
      <StyledHeading variant="h1" color="textPrimary">
        {text || ""}
      </StyledHeading>
    </Box>
  );
};

export default TypedAnimation;
