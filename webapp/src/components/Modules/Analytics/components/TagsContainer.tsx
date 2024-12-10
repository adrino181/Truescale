import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
const TagsContainer = ({ userTag }) => {
  console.log("user tags", userTag);
  if (!userTag || !userTag.length) {
    return <>No tags</>;
  }
  return (
    <>
      <Typography>Your Tags</Typography>
      <Box sx={{ pt: 1 }}>
        {userTag.map((item) => {
          return (
            <Chip
              key={item?._id}
              label={item?._id}
              color="secondary"
              sx={{ m: 0.5 }}
            />
          );
        })}
      </Box>
    </>
  );
};

export default TagsContainer;
