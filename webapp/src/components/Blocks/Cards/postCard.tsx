import * as React from "react";
import Card from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
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
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import * as S from "./style";
import { editorDataToJson } from "@/utils/parseHtml";
import PreviewPerson from "./previewPerson";
import { Popper } from "@mui/material";
const LongMenu = dynamic(() => import("@/components/Blocks/Menu"));
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

const CardHeader = ({ author, avatar, action, title, subHeader, theme, popperEle }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleAnchor = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  }
  const open = Boolean(anchorEl)
  const id = open ? 'popover-preview' : undefined;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }} >
        <div aria-describedby={id}
          style={{ cursor: 'pointer', padding: '1rem', display: 'flex', flexDirection: 'row' }}
          onTouchStart={handleAnchor}
          onMouseEnter={handleAnchor}
          onMouseLeave={handleAnchor}
        >
          {avatar}
          <div style={{ marginLeft: '10px' }}>
            <S.TitleHeader variant="body2">{title}</S.TitleHeader>
            <Typography color="textSecondary" variant="caption" sx={{ textDecoration: open ? 'underline' : 'none' }} >
              {subHeader}
            </Typography>
          </div>
          <Popper sx={{zIndex: 2, position: 'relative'}} disablePortal={true} open={open} anchorEl={anchorEl} >
            {popperEle}
          </Popper>
        </div>
        <div>
          {action}
        </div>
      </div>
    </>
  );
};

type CardType = {
  header: string;
  paragraph: string;
  image: string;
};

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
  padding: "0.2rem 0",
  position: "relative",
  marginTop: "-46px",
  background: "rgb(96 107 220 / 57%)",
  textAlign: "right",
  width: "100%",
  color: "white",
  textTransform: "none",
}));

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

export default function PostCard({ post }: PostCardProp) {
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
    popperEle,
  } = post || {};

  const cardUrl = postData?.rurl || `post/${_id ? _id : ""}`;
  const isPremium = postType === 1;
  const cardData = postData
    ? {
      image: postData?.image,
      header: postData?.title,
      paragraph: postData?.subheading,
    }
    : editorDataToJson(blockData);

  const handleReadMore = React.useCallback(() => {
    setReadMore(!readMore);
  }, []);

  const options = React.useMemo(() => {
    if (user) {
      const role = user.isAdmin
        ? "admin"
        : user._id === author?._id
          ? "owner"
          : "user";
      const options = getOptions(role);
      const userOptions = action.reduce((prev, curr) => {
        let key = curr.buttonSlug;
        return { ...prev, [key]: curr };
      }, {});
      return options.map((item) => userOptions[item]);
    }
  }, [user, action]);

  const cardAction = React.useMemo(() => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isPremium ? (
          <Typography variant="body2" color="textPrimary">
            ⭐ Members Only
          </Typography>
        ) : (
          <></>
        )}
        {action ? <LongMenu options={options} theme={theme} /> : <></>}
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
        boxShadow: 'none'
      }}
    >
      <>
        {author ? (
          <CardHeader
            avatar={
              <Avatar
                src={post?.author?.profileImageUrl}
                aria-label="author_profile"
              >
                {post?.author?.name}
              </Avatar>
            }
            action={cardAction}
            title={post?.author?.handle}
            subHeader={date}
            author={post?.author}
            theme={theme}
            popperEle={popperEle}
          />
        ) : (
          <></>
        )}
        <CardActionArea component={Link} href={`/${cardUrl}`}>
          <CardContentMemo />
        </CardActionArea>
        {!readMore ? (
          <StyledReadMore onClick={handleReadMore}>Read More..</StyledReadMore>
        ) : (
          <></>
        )}
      </>
    </Card>
  );
}
