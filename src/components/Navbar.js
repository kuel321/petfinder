import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Itsatest from './Itsatest';
import firebase from 'firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import { useEffect } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import Drawer from './Drawer';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [click, setClick] = React.useState(false);
  const [disabled, setDisable] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [pets, setLikedPets] = React.useState(0);
  const [ open, setOpen] = React.useState(false);
  const [loggedin, setLoggedin] = React.useState(false);
 

  const handleLogin = () => {
    setLogin(true);
    //setClick(true);
    
 
   setUser(true);
  }
  const handleLogout = () => {
    firebase.auth().signOut();
    setLogin(false);

    setUser(false)
  }
  const userLogged = firebase.auth().currentUser
  const loggedinUser = firebase.auth().currentUser

  useEffect(() => {
   const numberofLikedPets = firebase.database().ref('users/' + loggedinUser?.uid + '/likedAnimals').on('value', (snapshot) => {
 
    setLikedPets(snapshot.numChildren());
  }, (errorObject) => {
 
  }); 
})

const handleDrawer = () => {
  setOpen(true);

}
  
firebase.auth().onAuthStateChanged( user => {
  if(user == null){
    setLoggedin(false);
  }
  else {
    setLoggedin(true);
  }
})
 const handleToggle = () => {
  setOpen(false);
}


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Drawer openDrawer={open} toggleDrawer={handleToggle} username={userLogged?.displayName ?? "Loading user..."}/>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={handleDrawer} />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon onClick={props.home} />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Badge badgeContent={pets}>
            <FavoriteIcon onClick={props.favorite} />
            </Badge>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PetFind
          </Typography>
          {loggedin ? <Button onClick={handleLogout}  color="inherit">Log Out</Button> : <Button onClick={handleLogin} disabled={disabled} color="inherit">Login</Button>}
          
          {login ? <div className="login" ><Itsatest className="login" /> </div> : <></>} 
        </Toolbar>
      </AppBar>
    </div>
  );
}