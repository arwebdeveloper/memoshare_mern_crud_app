import React, { useEffect,useState } from "react";
import { Container, Grow, Grid,Paper,TextField,Button, AppBar } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination";
import useStyles from './style';
import { getPosts,getPostsBySearch } from "../../redux_store/actions/posts";
import { useDispatch } from "react-redux";
import { useHistory,useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

const useQuery =()=>{
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  
  const searchPost =()=>{
    if(search.trim() || tags){
      dispatch(getPostsBySearch({search,tags:tags.join(',')}))
      history.push(`posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`)
    }else{
      history.push('/');
    }
  }

  const handleKeyPress =(e)=>{
    if(e.keyCode === 13){
      searchPost();
    }
  }
  const handleAdd =(tag)=>(setTags([...tags,tag]));
  const handleDelete =(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
           <AppBar className={classes.appBarSearch} position="static"  color="inherit">
           <TextField
            name="search"
            variant="outlined"
            label="Search Memories"
            fullWidth
            onKeyPress={handleKeyPress}
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            />
            <ChipInput
              style={{margin: "10px 0"}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search tags"
              variant="outlined"
            />
            <Button
            onClick={searchPost}
            className={classes.appBarSearch}
            color="primary"
            variant="contained"
            >Search</Button>
           </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
              <Paginate page={page}/>
            </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
