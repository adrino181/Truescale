import React, { MouseEvent, useEffect } from 'react';
// import StyledInput from "@/components/Blocks/StyledInput";
import Input from "@mui/material/Input"
import CommentCard from "./CommentCard";
import Button from "@mui/material/Button";
import { styled } from "@mui/styles";
import { IComment } from '@/components/types';

const InputWrapper = styled('div')(({ theme }) => ({
  padding: ".5rem 1rem",
  background: theme.palette.tertiary.main,
  borderRadius: "8px",
}));

const StyledInput = styled(Input)(({ theme }) => ({
  width: "100%",
  background: theme.palette.tertiary.main,
}));

const Comment = ({ handleAddComments, handleGetComments, comments }:
  {
    handleAddComments: (body: string) => Promise<void>,
    handleGetComments: () => Promise<IComment[]>,
    comments: IComment[]
  }) => {
  const [commentText, setCommentText] = React.useState("");
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    handleAddComments(commentText)
    setCommentText("");
  }
  useEffect(() => {
    // if (!comments) {
    //   handleGetComments((payload: ICommnet[]) => {
    //     setComments(payload)
    //   })
    // }
    // return () => {
    //   // dispatch(resetData({param:'comments'}));
    // }
  }, [])
  return (
    <>
      <InputWrapper>
        < StyledInput
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
          multiline
          rows="4"
          disableUnderline
          type="text"
          placeholder="Post your comment"
        />
      </InputWrapper>
      <Button
        disabled={commentText.length === 0}
        onClick={handleSubmit}
        variant="contained"
        color="secondary"
        size="small"
        sx={{
          fontSize: "12px",
          margin: "1rem 0",
          textTransform: "none",
        }}
      >
        Post Comment
      </Button>
      <>
        {
          comments?.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        }
      </>
    </>
  );
};

export default Comment;
