import React, { useEffect, useRef, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./style";
import { commentPost } from "../../redux_store/actions/posts";
const CommentSection = ({ post }) => {
  // console.log("comment section ", post);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();
  
  
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComment = await dispatch(commentPost(finalComment, post._id));
    setComments(newComment)
    setComment('');

    commentsRef.current.scrollIntoView({behavior: "smooth"});
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {c}
            </Typography>
          ))}
          <div ref={commentsRef}/>
        </div>
        {user?.result?.name && (
        <div style={{ width: "55%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment}
            variant="contained"
            onClick={handleClick}
            color="primary"
          >
            Submit
          </Button>
        </div>)}
      </div>
    </div>
  );
};

export default CommentSection;
