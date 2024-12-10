import * as React from "react";
import Card from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import useConverter from "@/components/Blocks/Hooks/useConverter";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { editorDataToJson } from "@/utils/parseHtml";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
const optionsAdmin = ["delete", "share", "save"];
const optionsUser = ["share", "save"];
const optionsOwner = ["delete", "share", "save", "edit"];

interface PostCardProp {
  post: any;
}

type CardContentProp = {
  tags: { label: string; value: string }[] | string[];
  cardData: { header: string; paragraph: string };
  toggleReadMore?: Function | (() => null);
  readMore: boolean;
};

const StyledReadMore = styled(Button)(() => ({
  padding: "0/5rem 0",
  position: "relative",
  marginTop: "-46px",
  background: "rgb(96 107 220 / 57%)",
  textAlign: "right",
  width: "100%",
  color: "white",
  textTransform: "none",
}));

export default function CreatePostCard({ post }: PostCardProp) {
  const { date } = useConverter(post);
  const theme = useTheme();
  const [readMore, setReadMore] = React.useState(false);
  const {
    blockData,
    _id,
    tags,
    postData,
    action,
    author,
    user,
    format,
    type: postType,
  } = post || {};

  const cardUrl = postData?.rurl || `post/${_id ? _id : ""}`;
  const isPremium = postType === 1;
  const cardData = editorDataToJson(blockData);
  const CardContentMemo = React.useCallback(() => {
    return (
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          Heading
        </Typography>
        <Typography variant="h6" color="text.primary">
          {cardData?.title}
        </Typography>
        <Box sx={{ my: 2 }}>
          {cardData?.image ? (
            <CardMedia
              component="img"
              height="194"
              src={cardData?.image}
              alt="card image"
            />
          ) : (
            <>
              <Skeleton variant="rectangular" height={200} />
            </>
          )}
        </Box>
        <Typography variant="caption" color="text.secondary">
          Description
        </Typography>
        <Typography variant="subtitle2" color="text.primary">
          {cardData?.subheading}
        </Typography>
      </CardContent>
    );
  }, [cardData, tags, format, readMore]);

  return (
    <Card
      sx={{
        minWidth: 100,
        background: theme.palette.tertiary.main,
        "& > .MuiCardContent-root": {
          padding: "0 0 0 0",
        },
      }}
    >
      <>
        <CardContentMemo />
      </>
    </Card>
  );
}
