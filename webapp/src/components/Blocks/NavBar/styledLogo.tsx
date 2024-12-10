
import { styled } from "@mui/material/styles";
import Logo from "@/components/svg/logo.svg";
import { keyframes } from "@mui/material";

export const StyledLogo = styled(Logo)((props) => ({
  "& .logo_svg__stop_1": {
    stopColor: "#5b4fe9",
    animation: `${color_juggle1} 2s infinite ease-out`,
    animationDirection: "alternate",
  },
  "& > .logo_svg__path_1": {
    "stroke-width": "2px",
  },
  "& .logo_svg__path_2": {
    strokeWidth: "2",
  },
  "& .logo_svg__path_3": {
    strokeWidth: "2px",
  },
  "& .logo_svg__path_4": {
    strokeWidth: "2px",
  },
  "& .logo_svg__stop_2": {
    "stop-color": "#8E54E9",
    animation: `${color_juggle1} 2s infinite ease-out`,
    animationDirection: "alternate",
  },
  "& .logo_svg__stop_3": {
    "stop-color": "#8c84f0",
    animation: `${color_juggle1} 2s infinite ease-out`,
    animationDirection: "alternate",
  },
}));

const color_juggle1 = keyframes`
0%   {stop-color: #5b4fe9; }
25%  {stop-color: #6b61eb; }
50%  {stop-color: #7c72ed; }
75%  {stop-color: #8c84f0; }
100% {stop-color: #9d95f2; }
`;
