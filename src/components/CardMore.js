import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import MoreIcon from '@material-ui/icons/More';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import More from '@material-ui/icons/More';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 245,
    minWidth: 245,
    order: 3,
    margin: '2rem',
  },
  media: {
    height: 100,
    maxHeight: 100,
    minHeight: 100,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '2px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
 
  return (
      
    <Card className={classes.root}>

     
     
        <CardContent>
        <IconButton onClick={props.seeMore} style={{maxWidth: '80px', maxHeight: '80px', minWidth: '80px', minHeight: '80px'}}>
            <More style={{maxWidth: '60px', maxHeight: '60px', minWidth: '60px', minHeight: '60px'}} />
            </IconButton>
          <Typography paragraph>View More</Typography>
          
        </CardContent>
      
    </Card>
  );
}
