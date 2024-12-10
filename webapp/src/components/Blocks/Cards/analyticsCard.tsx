import * as React from "react";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import useConverter from "@/components/Blocks/Hooks/useConverter";
import dynamic from "next/dynamic";
import { TWO_GRID_FORMAT, THREE_GRID_FORMAT } from "./contant";
import Collapse from "@mui/material/Collapse";
import { editorDataToJson } from "@/utils/parseHtml";
import ActionBar from "@/components/Blocks/ActionBar";

interface PostCardProp {
  post: any;
}

type CardContentProp = {
  tags: { label: string; value: string }[] | string[];
  cardData: { header: string; paragraph: string };
  toggleReadMore?: Function | (() => null);
  readMore: boolean;
};

const PostCardContent = ({
  tags,
  cardData,
  toggleReadMore,
  readMore,
}: CardContentProp) => {
  const ChipsData = React.useCallback(
    () => (
      <>
        {(tags || []).slice(0, 3).map((item) => (
          <>
            <Chip
              key={item?.value || item}
              label={item?.label || item || "??"}
              color="secondary"
              sx={{ m: 0.5 }}
            />
          </>
        ))}
      </>
    ),
    [tags]
  );
  return (
    <>
      <Collapse in={readMore} timeout="auto" unmountOnExit>
        <Typography variant="body2" sx={{ my: 1 }} color="text.secondary">
          {cardData?.paragraph.slice(0, 200)}...
        </Typography>
        <ChipsData />
      </Collapse>
    </>
  );
};

export default function AnalyticsCard({ post }: PostCardProp) {
  const { date } = useConverter(post);
  const theme = useTheme();
  const [readMore, setReadMore] = React.useState(false);
  const { blockData, _id, tags, postData, format, type: postType } = post || {};

  const cardData = postData
    ? {
        image: postData?.image,
        header: postData?.title,
        paragraph: postData?.subheading,
      }
    : editorDataToJson(blockData);

  const CardAction = React.useCallback(() => {
    const cardActionData = [
      {
        buttonSlug: "like",
        label: post?.totalLikes || 0,
        active: true,
      },
      {
        buttonSlug: "view",
        label: post?.totalSessions || 0,
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
      </div>
    );
  }, [theme]);

  const CardContentMemo = React.useCallback(() => {
    if (format !== TWO_GRID_FORMAT) {
      return (
        <CardContent sx={{ display: "flex" }}>
          {cardData?.image ? (
            <CardMedia
              component="img"
              sx={{
                height: "52px",
                width: "100px",
              }}
              src={cardData?.image}
              alt="card image"
            />
          ) : (
            <></>
          )}
          <Typography variant="subtitle2" color="text.secondary">
            {cardData?.header}
          </Typography>
        </CardContent>
      );
    }
    return (
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {!readMore ? `${cardData?.header.slice(0, 40)}...` : cardData?.header}
        </Typography>
        <PostCardContent tags={tags} cardData={cardData} readMore={readMore} />
        {cardData?.image ? (
          <CardMedia
            component="img"
            height="194"
            src={cardData?.image}
            alt="card image"
          />
        ) : (
          <></>
        )}
      </CardContent>
    );
  }, [cardData, tags, format, readMore]);

  return (
    <Card
      sx={{
        minWidth: 100,
        background: theme.palette.tertiary.main,
      }}
    >
      <>
        <CardActionArea>
          <CardContentMemo />
        </CardActionArea>
        <CardAction />
      </>
    </Card>
  );
}
