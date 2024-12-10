import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import ErrorSvg from "@/components/svg/svgNotFound.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { keyframes } from "@mui/system";

const HeroContainer = styled(Container, {
  shouldForwardProp: (props) => true,
})(({ theme }) => ({
  height: "calc(100% - 60px)",
  minHeight: "100vh",
  margin: "auto",
  zIndex: 3,
  position: "relative",
  background: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "20px auto",
  textTransform: "none",
  color: "white",
  background: "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)",
  fontWeight: "800",
  px: 3,
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  fontSize: "16rem",
  fontWeight: "700",
  lineHeight: "16rem",
  color: "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)",
}));

const color_juggle1 = keyframes`
0%   {stop-color: #0765E3; }
100% {stop-color: #AE01FF; }
`;

const color_juggle2 = keyframes`
100% {stop-color: #0765E3; }
0% {stop-color: #AE01FF; }
`;

const ErrorSvgAnimation = styled(ErrorSvg)(({ theme }) => ({
  "& .svgNotFound_svg__stop_1": {
    animation: `${color_juggle1} 1s infinite ease-out`,
    animationDirection: "alternate",
  },
  "& .svgNotFound_svg__stop_2": {
    animation: `${color_juggle2} 1s infinite ease-out`,
    animationDirection: "alternate",
  },
  //   "& .svgNotFound_svg__path_1": {
  //     fill: "red",
  //   },
}));

export default function Custom404() {
  return (
    <HeroContainer>
      <div style={{ width: "95%" }}>
        <ErrorSvgAnimation />
      </div>
      <div>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontSize: { xs: "2rem", sm: "4rem", md: "4rem" },
          }}
        >
          Page not found
        </Typography>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontSize: { xs: "0.8rem", sm: "1rem", md: "2rem" },
          }}
        >
          Oops, you still havent found what you looking for ?
        </Typography>
      </div>
      <StyledButton
        startIcon={<ArrowBackIcon />}
        onClick={() => {
          location.href = "/";
        }}
      >
        Back to home page
      </StyledButton>
    </HeroContainer>
  );
}
