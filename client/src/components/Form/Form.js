import React, { useEffect, useState } from "react";
import { Typography, TextField, Paper, Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import { createPosts, updatePost } from "../../redux_store/actions/posts";
import { useHistory } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleChange = (e, prop) => {
    if(prop==="tags"){
      setPostData({ ...postData, [prop]: e.target.value.split(',') });  
    }else{
      setPostData({ ...postData, [prop]: e.target.value });
    }

  };
  
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId===0) {
      dispatch(createPosts({...postData,name: user?.result?.name},history));
    } else {
      dispatch(updatePost(currentId,{...postData,name: user?.result?.name}));
    }
    clear();
  };

  if(!user?.result?.name){
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and likes others memories 
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          value={postData.title}
          onChange={(e) => handleChange(e, "title")}
          fullWidth
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          value={postData.message}
          onChange={(e) => handleChange(e, "message")}
          fullWidth
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          value={postData.tags}
          onChange={(e) => handleChange(e, "tags")}
          fullWidth
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>{
              setPostData({ ...postData, selectedFile: base64 })
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
