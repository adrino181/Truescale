import { useCallback } from "react";
import Box from "@mui/material/Box";
import AnalyticsCard from "@/components/Blocks/Cards/analyticsCard";
import Typography from "@mui/material/Typography";
const PostStack = ({ posts }) => {
  const PostsItem = useCallback(() => {
    if (!posts || !posts.length) {
      return <Box>No Posts Yet</Box>;
    }

    return posts.map((item) => (
      <>
        <Box sx={{ mt: 1 }}>
          <AnalyticsCard post={item} />
        </Box>
      </>
    ));
  }, [posts]);

  return (
    <Box>
      <Typography>Most Recent</Typography>
      <PostsItem />
    </Box>
  );
};

export default PostStack;
