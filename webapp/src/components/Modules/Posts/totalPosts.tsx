import { getPersonalPosts } from "@/redux/posts/personal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import PostCard from "@/components/Blocks/Cards/postCard";
import Box from "@mui/material/Box";

const TotalPosts = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.post.personal);
  useEffect(() => {
    if (!posts || !posts.length) {
      dispatch(getPersonalPosts());
    }
  }, []);
  if (!posts) {
    return <></>;
  }
  return (
    <>
      {posts.map((post, index) => (
        <Box key={post?.id || index} sx={{ paddingTop: "10px" }}>
          {/* tabs needed here with labels (saved, drafts, liked, posted) */}
          <PostCard post={post} />
        </Box>
      ))}
    </>
  );
};

export default TotalPosts;
