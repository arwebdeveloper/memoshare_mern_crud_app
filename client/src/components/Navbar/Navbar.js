import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

import useStyle from "./style";
import logo from "../../images/logo.png";
import textLogo from "../../images/MEMOSHARE.png";
import { useDispatch } from "react-redux";
import { LOG_OUT } from "../../redux_store/constants";
import { useHistory } from "react-router-dom";
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // console.log('user',user);
  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    const token = user?.token;
    if(token){
      const decodeToken = decode(token);
      if(decodeToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile'))
    )
  },[location])

  const logout =()=>{
    dispatch({type:LOG_OUT})
    history.push('/');
    setUser(null);
  }
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={textLogo} alt="memoshare" height="50"/>
        <img className={classes.image} src={logo} alt="memories" height="40" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt[0]}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color={"secondary"}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            component={Link}
            to="/auth"
            color={"primary"}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
