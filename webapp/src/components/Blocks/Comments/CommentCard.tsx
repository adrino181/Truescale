
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { parseDate } from "@/utils/parseDate";
import { IComment, ICommentAdd } from "@/components/types";

const CommentCard = ({ comment }: { comment: IComment }) => (
  <Box sx={{ p: 1 }}>
    <Grid container flexWrap="nowrap">
      <Grid item sx={{ paddingRight: "1rem" }}>
        <img
          src={`${comment?.author?.profileImageUrl}`}
          alt="user-image"
          width="50px"
        />
      </Grid>
      <Grid item flexGrow="1">
        <Box>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            flexWrap="nowrap"
          >
            <Grid item>
              <Box display="flex">
                <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }}>
                  @{comment?.author?.handle}
                </Typography>
                <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }}>
                  {parseDate(comment.createdAt)}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "15px", color: "#555" }}>
                  {comment.text}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Grid>
          </Grid>
          {/* <Box
              display="flex"
              justifyContent="space-between"
              marginRight="5rem"
              marginTop=".8rem"
            >
              <IconButton size="small">
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <SyncIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                {comment.isLiked ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton size="small">
                <IosShareIcon fontSize="small" />
              </IconButton>
            </Box> */}
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default CommentCard;
