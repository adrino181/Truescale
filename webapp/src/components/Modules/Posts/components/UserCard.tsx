import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useConverter from "@/components/Blocks/Hooks/useConverter";

// const parseDate = dynamic(() => import("@/utils/parseDate"), {
//   ssr: false,
// });

const UserCard = ({ props }) => {
  const { date } = useConverter(props);
  return (
    <Grid container item md={12} alignItems="center">
      <Grid item>
        <Avatar
          sx={{ width: 56, height: 56 }}
          style={{ background: "white" }}
          alt={props?.author?.userId?.username}
          src={props?.author?.profileImageUrl}
        />
      </Grid>
      <Grid item flexGrow="1" sx={{ ml: 3 }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              @{props?.author && props?.author?.handle}
            </Typography>
            <Typography variant="caption">{date}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserCard;
