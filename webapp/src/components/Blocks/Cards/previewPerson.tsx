import * as React from "react";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import * as S from "./style";
import { Button } from "@mui/base";
import { Theme } from "@mui/material";

const CardHeader = ({ author, avatar, title, subHeader, listenAction }) => {
  const [isListening, setListenting] = React.useState(author.isListening ? true : false);
  const toggleListenting = () => {
    listenAction({
        follow: !isListening,
        id: author._id,
      });
    setListenting(prev => !prev);
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: '1rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        {avatar}
        <Button onClick={toggleListenting}>{isListening ? 'Listening' : 'Listen'}</Button>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginLeft: "1rem" }}>
          <S.TitleHeader variant="body2">{title}</S.TitleHeader>
          <Typography color="textSecondary" variant="caption">
            {subHeader}
          </Typography>
          <Link
            style={{
              display: "flex",
              padding: "1rem",
              textDecoration: "none",
            }}
            href={`/profile/${author?._id}`}
          >
            <Button>View Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface PostCardProp {
  author: any;
  theme: Theme
  followAuthor: (id: string) => void;
}


export default function PreviewPerson({ author, theme, followAuthor }: PostCardProp) {
  // const theme = useTheme();
  return (
    <Card
      sx={{
        minWidth: 100,
        background: theme.palette.primary.main,
        border: `2px solid ${theme.palette.secondary.main}`
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={author?.profileImageUrl}
            aria-label="author_profile"
          >
            {author?.name}
          </Avatar>
        }
        title={author?.handle}
        author={author}
        subHeader={author?.headLine}
        listenAction={followAuthor}
      />
    </Card >
  );
}
