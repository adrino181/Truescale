import ViewEye from "@/components/svg/ViewEye.svg";
import ListItem from "@mui/material/ListItem";
import Clap from "@/components/svg/Clap.svg";
import Box from "@mui/material/Box";
import PostIcon from "@/components/svg/PostIcon.svg";
import Typography from "@mui/material/Typography";
const ActionStats = ({ total }) => {
  const { totalLikes, totalPosts, totalSession } = total[0] || {};
  return (
    <Box
      sx={{
        display: "flex",
        mt: { xs: 0, md: 2 },
        ml: { xs: 0, md: 4 },
      }}
    >
      <ListItem sx={{ minWidth: "100px", p: 0 }}>
        <Clap style={{ fill: "#D7AE04" }} />
        <Typography sx={{ ml: 1 }}>{totalLikes || 0} clap</Typography>
      </ListItem>
      <ListItem sx={{ minWidth: "100px", p: 0, ml: 2 }}>
        <PostIcon />
        <Typography sx={{ ml: 1 }}>{totalPosts || 0} post</Typography>
      </ListItem>
      <ListItem sx={{ minWidth: "100px", p: 0, ml: 0 }}>
        <ViewEye />
        <Typography sx={{ ml: 1 }}>{totalSession || 0} view</Typography>
      </ListItem>
    </Box>
  );
};

export default ActionStats;
