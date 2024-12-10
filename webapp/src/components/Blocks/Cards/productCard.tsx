import * as React from "react";
import Card from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Chip from "@mui/material/Chip";
import useConverter from "@/components/Blocks/Hooks/useConverter";
import dynamic from "next/dynamic";
import { TWO_GRID_FORMAT, THREE_GRID_FORMAT } from "./contant";
import ShareIcon from "@/components/svg/ShareIcon.svg";
import Clap from "@/components/svg/Clap.svg";
import ViewEye from "@/components/svg/ViewEye.svg";
import CommentIcon from "@/components/svg/CommentIcon.svg";
import ActionBar from "@/components/Blocks/ActionBar";

const LongMenu = dynamic(() => import("@/components/Blocks/Menu"));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const optionsAdmin = ["delete", "share", "save"];
const optionsUser = ["share", "save"];
const optionsOwner = ["delete", "share", "save", "edit"];

const getOptions = (role: string) => {
  if (role === "admin") {
    return optionsAdmin;
  }
  if (role === "owner") {
    return optionsOwner;
  }
  return optionsUser;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type CardType = {
  header: string;
  paragraph: string;
  image: string;
};

interface PostCardProp {
  post: any;
}

export default function ProductCard({ post, format }: PostCardProp) {
  const { date } = useConverter(post);
  const theme = useTheme();
  const { blockData, _id, tags, postData, action, username, author, user } =
    post || {};

  const cardUrl = postData?.rurl || `post/${_id ? _id : ""}`;
  const isPremium = user?.isPremium;
  const cardData = {
    image: postData?.image,
    header: postData?.title,
    paragraph: postData?.subheading,
  };

  const cardAction = React.useMemo(() => {
    const cardActionData = [
      {
        buttonSlug: "like",
        label: post.likesCount,
        active: true,
      },
      {
        buttonSlug: "comment",
        label: post?.commentsCount || 0,
      },
      {
        buttonSlug: "view",
        label: post?.views || 0,
      },
    ];
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ActionBar buttonAction={cardActionData} />
        <div>
          {isPremium ? (
            <Typography variant="body2">⭐ Members Only</Typography>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }, [theme]);

  const CardContentMemo = React.useCallback(() => {
    if (format === TWO_GRID_FORMAT) {
      return (
        <CardContent sx={{ display: "flex" }}>
          <Typography variant="subtitle2" color="text.secondary">
            {cardData?.header}
          </Typography>
        </CardContent>
      );
    }
    return (
      <CardContent sx={{ paddingTop: "5px", paddingBottom: "5px" }}>
        <Typography variant="subtitle2" color="text.secondary">
          {cardData?.header}
        </Typography>
      </CardContent>
    );
  }, [cardData, tags, format]);

  return (
    <Card
      sx={{
        background: theme.palette.tertiary.main,
      }}
    >
      <>
        {username ? (
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], width: 35, height: 35 }}
                src={post?.author?.profileImageUrl}
                aria-label="author_profile"
              >
                {username}
              </Avatar>
            }
            sx={{
              paddingTop: "5px",
              paddingBottom: "5px",
              "& .MuiCardHeader-title": {
                color: theme.palette.text.primary,
              },
            }}
            action={cardAction}
            title={username}
            subheader={date}
          />
        ) : (
          <></>
        )}
        <CardActionArea component={Link} prefetch={false} href={`/${cardUrl}`}>
          <CardContentMemo />
        </CardActionArea>
      </>
    </Card>
  );
}
