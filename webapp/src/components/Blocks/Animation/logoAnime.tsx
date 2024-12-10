import React, { useRef, useState } from "react";
import LogoAnime from "@/components/svg/logoAnime.svg";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-10deg);
  }
`;

const color_juggle = keyframes`
  from {
    stroke: #5B4FE9;
  }
  to {
    stroke: #7786D2;
  }
`;

const color_juggle1 = keyframes`
0%   {stop-color: #5b4fe9; }
25%  {stop-color: #6b61eb; }
50%  {stop-color: #7c72ed; }
75%  {stop-color: #8c84f0; }
100% {stop-color: #9d95f2; }
`;

// 5b4fe9	5247d2	493fba 5247d2 5b4fe9
const color_juggle2 = keyframes`
0%   {stop-color: #9d95f2; }
25%  {stop-color: #5b4fe9; }
50%  {stop-color: #6b61eb; }
75%  {stop-color: #7c72ed; }
100% {stop-color: #8c84f0; }
`;

const color_juggle3 = keyframes`
0%   {stop-color: #8c84f0; }
25%  {stop-color: #9d95f2; }
50%  {stop-color: #5b4fe9; }
75%  {stop-color: #6b61eb; }
100% {stop-color: #7c72ed; }
`;

const color_juggle4 = keyframes`
0%   {stop-color: #7c72ed; }
25%  {stop-color: #8c84f0; }
50%  {stop-color: #9d95f2; }
75%  {stop-color: #5b4fe9; }
100% {stop-color: #6b61eb; }
`;

const LogoStyled = styled(LogoAnime)((props) => ({
  "& .logoAnime_svg__clip1": {
    strokeWidth: "30px",
  },
  "& .logoAnime_svg__path_1": {
    strokeWidth: "30px",
  },
  "& .logoAnime_svg__path_2": {
    strokeWidth: "30px",
  },
  "& .logoAnime_svg__path_3": {
    strokeWidth: "30px",
  },
  "& .logoAnime_svg__path_4": {
    strokeWidth: "30px",
  },
  "& .logoAnime_svg__path_5": {
    strokeWidth: "30px",
    //animation: `${color_juggle} 2s infinite ease`,
    strokeLinecap: "round",
  },
  "& .logoAnime_svg__path_6": {
    // stroke: "#7786D2",
    strokeWidth: "30px",
    strokeLinecap: "round",
    // animation: `${color_juggle} 2s infinite ease`,
  },
  "& .logoAnime_svg__stop_1": {
    // stroke: "#7786D2",
    animation: `${color_juggle1} 2s infinite ease-out`,
    animationDirection: "alternate",
  },
  "& .logoAnime_svg__stop_2": {
    animation: `${color_juggle2} 2s infinite ease-out`,
    animationDirection: "alternate",
  },
  "& .logoAnime_svg__stop_3": {
    animation: `${color_juggle3} 2s infinite ease-out`,
    animationDirection: "alternate",
  },
  "& .logoAnime_svg__stop_4": {
    animation: `${color_juggle4} 2s infinite ease-out`,
    animationDirection: "alternate",
  },
  // "& > g >  .Clap_svg__clap_hand2": {
  //   stroke: props.isActive ? "" : "#F2D65E",
  //   fill: props.isActive ? "#F2D65E" : "",
  // },
  // "& > g > .Clap_svg__clap_hand1": {
  //   stroke: props.isActive ? "" : "#F2D65E",
  //   fill: props.isActive ? "#F2D65E" : "",
  // },
  // "&:hover > g >  .Clap_svg__clap_hand2": {
  //   transform: !props.isActive && "skew(-5deg, -5deg)",
  // },
  // "&:hover > g > .Clap_svg__clap_hand1": {
  //   fill: "#F2D65E",
  //   transform: !props.isActive && "skewX(5deg)",
  //   transition: "all 1s ease",
  // },
  // "&:hover > g > .Clap_svg__clap_misc1": {
  //   fill: "#F2D65E",
  // },
  // "&:hover > g > .Clap_svg__clap_misc2": {
  //   fill: "#F2D65E",
  // },
  // "&:hover > g > .Clap_svg__clap_misc3": {
  //   fill: "#F2D65E",
  // },
  // "& > g > .Clap_svg__clap_misc1": {
  //   fill: props.isActive ? "#F2D65E" : "",
  // },
  // "& > g > .Clap_svg__clap_misc2": {
  //   fill: props.isActive ? "#F2D65E" : "",
  // },
  // "& > g > .Clap_svg__clap_misc3": {
  //   fill: props.isActive ? "#F2D65E" : "",
  // },
}));

const LogoContainer = styled("div")({
  minHeight: "365px",
  width: "332px",
  resize: "both",
  overflow: "hidden",
  display: "block",
});

const RotatedBox = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // height: "365px",
  // resize: "both",
  // overflow: "auto",
  //animation: `${spin} 2s infinite ease`,
});
export default function Logo3D() {
  return (
    <RotatedBox>
      <LogoContainer>
        <LogoStyled />
      </LogoContainer>
    </RotatedBox>
  );
}
