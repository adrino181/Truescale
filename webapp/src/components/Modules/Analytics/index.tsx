import Container from "@mui/material/Container";
import PostStack from "./components/PostStack";
import TagsContainer from "./components/TagsContainer";
import Realtime from "./components/Realtime";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAnalyticsData } from "@/redux/analyticSlice";
import { useCallback, useEffect } from "react";
import ActionStats from "./components/ActionStats";
import theme from "@/styles/theme";
import Typography from "@mui/material/Typography";

const Analytics = () => {
  const dispatch = useAppDispatch();
  const { status, ...data } = useAppSelector((state) => state.analytics);
  useEffect(() => {
    if (!Object.keys(data).length) {
      dispatch(getAnalyticsData());
    }
  }, []);

  const RenderScreen = useCallback(() => {
    if (status !== "fulfilled" || !data) {
      return <></>;
    }
    const { postData, sessions, total, userTag } = data;
    return (
      <>
        <Container
          maxWidth="md"
          sx={{
            background: theme.palette.tertiary.main,
            position: "relative",
            p: 0,
          }}
        >
          <Realtime sessions={sessions} total={total} />
          <Grid
            item
            sx={{ position: { xs: "flex", md: "absolute" }, top: "0", p: 0 }}
          >
            <ActionStats total={total} />
          </Grid>
        </Container>
        <Grid container maxWidth="md" sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <PostStack posts={postData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TagsContainer userTag={userTag} />
          </Grid>
        </Grid>
      </>
    );
  }, [status, data]);

  return <RenderScreen />;
};

export default Analytics;
