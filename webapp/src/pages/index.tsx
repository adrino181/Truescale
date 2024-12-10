import Head from "next/head";
import { Typography, Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";
import DynamicLogo from "@/components/svg/DynamicLogo.svg";
import { Masonry } from "@mui/lab";
import FlatCard from "@/components/Blocks/Cards/flatCard";
import { useAnalytics } from "@/components/Blocks/Contexts/AnalyticsContext";
import { useEffect } from "react";
import { baseUrl } from "@/components/services/Api";
const MeshThreeJs = dynamic(() => import("@/components/Blocks/Animation"), {
  ssr: false,
});

const LogoLarge = dynamic(
  () => import("@/components/Blocks/Animation/logoAnime"),
  {
    ssr: false,
  }
);

const Auth = dynamic(() => import("@/components/Modules/Auth"), {
  ssr: false,
});
const BlurIllustration = styled("div")({
  position: "absolute",
  height: "200px",
  width: "200px",
  left: "22%",
  borderRadius: "50%",
  "&::before": {
    content: "''",
    minHeight: 250,
    minWidth: 250,
    maxHeight: 400,
    maxWidth: 400,
    display: "block",
    color: "white",
    border: "1px solid white",
    borderRadius: "50%",
    top: "11%",
    left: "16%",
    backgroundColor: "white",
    background: "rgba(139, 151, 215, 0.25)",
    filter: "blur(175px)",
  },
});

const HeroContainer = styled(Box, {
  shouldForwardProp: (props) => true,
})(({ theme }) => ({
  height: "95vh",
  width: "95%",
  margin: "auto",
  zIndex: 3,
  position: "relative",
  background: theme.palette.primary.main,
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
}));

const NormalContainer = styled(Box, {
  shouldForwardProp: (props) => true,
})(({ theme }) => ({
  padding: "2rem 0",
  width: "95%",
  margin: "auto",
  zIndex: 3,
  position: "relative",
}));

const StyleSubHeading = styled(Typography)(({ theme }) => ({
  margin: "20px 0",
  fontWeight: "500",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "20px auto",
  textTransform: "none",
  color: "white",
  background: "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)",
  fontWeight: "300",
}));
const Heading = () => {
  return (
    <>
      {/* <DynamicLogo
        style={{
          height: "400px",
          width: "400px",
          fill: theme.palette.secondary.main,
        }}
      /> */}
      {/* <Typography color="textPrimary" variant="h1">
        Truescale
      </Typography> */}
    </>
  );
};

const SubHeading = () => {
  return (
    <StyleSubHeading
      variant="body2"
      color="textPrimary"
      sx={{ display: { xs: "none", md: "block" } }}
    >
      Plaform for Entrepreneurs and a online hub to share your business. Create
      your identity on Truescale and start using the platform as a website for
      your hustle or as a analytical tool to see your content performance,
      listen to others and create a subscribers list. Everything is step away,
      join us and start building your business network.
    </StyleSubHeading>
  );
};
const LandingPage = ({ props }) => {
  const theme = useTheme();
  const router = useRouter();
  const { sendEvent, isTrackerLoaded } = useAnalytics();
  const { posts } = props || null;
  const handleGetStarted = () => {
    router.push("/signup");
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const column_spacing = isMobile ? 1 : (isTablet ? 2 : 3);
  useEffect(() => {
    if (isTrackerLoaded) {
      sendEvent({ name: "Home Page Landing" });
    }
  }, [isTrackerLoaded]);

  return (
    <>
      <HeroContainer>
        {/* <BlurIllustration /> */}
        <Grid
          container
          sx={{
            justifyContent: "center",
            zIndex: 4,
            position: "relative",
            alignItems: "center",
            height: "100%",
          }}
          maxWidth="lg"
        >
          <Grid
            md={6}
            xs={12}
            item
            sx={{
              textAlign: "center",
              display: {
                md: "block",
              },
            }}
          >
            {/* <Heading /> */}
            {/* <DynamicLogo
              style={{
                height: "400px",
                width: "400px",
                stroke: theme.palette.secondary.main,
              }}
            /> */}
            <LogoLarge />
            <SubHeading />
            {/* <SubHeading />
            <Box
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={handleGetStarted}
                sx={{ minWidth: "110px" }}
              >
                Get Started
              </StyledButton>
              <Box
                sx={{
                  alignItems: "center",
                  marginBottom: "-100px",
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
              >
                <span>
                  <TurnedArrow />
                </span>
                <span style={{ maxHeight: "180px", marginLeft: "-20px" }}>
                  <EverythingTxt />
                </span>
              </Box>
            </Box> */}
          </Grid>
          <Grid md={6} xs={12}>
            <Auth />
          </Grid>
        </Grid>
        <div
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 0,
          }}
        >
          <MeshThreeJs />
        </div>
      </HeroContainer>
      <NormalContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Trending /> */}
          <Typography
            variant="h5"
            sx={{ color: theme.palette.text.primary, ml: 1 }}
          >
            Trending on Truescale
          </Typography>
        </Box>
        <Grid spacing={2} sx={{ mt: 2 }}>
          {isMobile ? (
            posts.map((post) => (
              <Box sx={{ mt: 3 }} key={post.category}>
                <Typography color="white">#{post.category}</Typography>
                <Box>
                  {post.documents.map((item) => (
                    <Box sx={{ width: "100%", mt: 1 }} key={item.id}>
                      {<FlatCard post={item} />}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))
          ) : (
            <Masonry
              columns={column_spacing}
              spacing={column_spacing}
              sx={{ margin: "0" }}
            >
              {posts.map((post) => (
                <Box sx={{ mt: 4 }} key={post.category}>
                  <Typography color="textPrimary" sx={{ fontWeight: "bold" }}>
                    #{post.category}
                  </Typography>
                  <Box>
                    {post.documents.map((item) => (
                      <Box sx={{ width: "100%", mt: 2 }} key={item.id}>
                        {<FlatCard post={item} />}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Masonry>
          )}
        </Grid>
      </NormalContainer>
    </>
  );
};

export default function Home(props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Truescale: Empowering Entrepreneurs to Learn and Build</title>
        <meta
          name="description"
          content="Make the most of available resources to build your business"
        />
        <meta
          name="keywords"
          content="Truescale, Learn and Build, Entrepreneur"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://truescale-v2.s3.ap-south-1.amazonaws.com/truescale-meta-thumb-4.png"
        />
      </Head>
      <main>
        <LandingPage props={props} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/posts/homepageTrending`);
  if (!res) {
    console.log("Can't fetch Static HomePage");
    return {
      props: {

      }
    }
  }
  const posts = await res.json();
  return {
    props: {
      ...posts,
    },
  };
}
