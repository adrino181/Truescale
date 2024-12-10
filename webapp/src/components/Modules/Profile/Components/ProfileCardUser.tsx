import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Chip from "@mui/material/Chip";

const ProfileCardUser = ({
  theme,
  imageUploadLoading,
  submitFile,
  profile,
  handleFollow,
  followerStatus,
  followingStatus,
  followings,
  followers,
  setEditModal,
  hideFollow,
}) => {
  return (
    <Box position="relative">
      <Box
        sx={{
          position: "relative",
          padding: "20px 10px",
        }}
      >
        <Grid container xs={12} justifyContent="center">
          <Grid item>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  [theme.breakpoints.up("sm")]: {
                    width: 100,
                    height: 100,
                  },
                  cursor: "pointer",
                  border: "0px solid white",
                  boxShadow: 1,
                  borderRadius: "50%",
                  display: "flex",
                  justfiyContent: "center",
                  alignItems: "center",
                }}
              >
                {imageUploadLoading ? (
                  <Box
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={20} color="primary" />
                  </Box>
                ) : profile?.profileImageUrl ? (
                  <Avatar
                    alt="Profile"
                    src={profile.profileImageUrl}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      [theme.breakpoints.up("sm")]: {
                        width: 100,
                        height: 100,
                      },
                    }}
                    onClick={() => {}}
                    variant="rounded"
                  />
                ) : (
                  <></>
                )}
              </Box>
              <label htmlFor="contained-button-file">
                {imageUploadLoading ? (
                  <></>
                ) : (
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: "none" }}
                    onChange={(event) => submitFile(event.target.files)}
                  />
                )}
                <EditRoundedIcon
                  sx={{
                    position: "absolute",
                    bottom: -5,
                    right: -4,
                    cursor: "pointer",
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: "8px",
                    padding: "2px",
                    color: "white",
                  }}
                  fontSize="small"
                />
              </label>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box
              padding="0px 20px"
              sx={{
                padding: "0 0 0 10px",
                [theme.breakpoints.up("sm")]: {
                  padding: "0 0 0 20px",
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  @ {profile?.handle}
                </Typography>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    setEditModal(true);
                  }}
                >
                  <EditRoundedIcon
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      right: -4,
                      cursor: "pointer",
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: "8px",
                      padding: "3px",
                      color: "white",
                    }}
                    fontSize="medium"
                  />
                </IconButton>
              </div>
              <>
                <a href={profile?.website} target="_blank" rel="noreferrer">
                  <Typography variant="body2" color="secondary">
                    Your Channel
                  </Typography>
                </a>
              </>
              {
                <Box display="flex">
                  <Typography color="textPrimary" marginRight="1rem">
                    <strong style={{ color: "white" }}>
                      {followerStatus === "success" && followers.length !== 0
                        ? followers[0].followerId.length
                        : 0}
                    </strong>{" "}
                    Listeners
                  </Typography>
                  <Typography color="textPrimary">
                    <strong style={{ color: "white" }}>
                      {followingStatus === "success" && followings.length !== 0
                        ? followings[0].followingId.length
                        : 0}
                    </strong>{" "}
                    Listening
                  </Typography>
                </Box>
              }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileCardUser;
