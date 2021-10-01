import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function GroupOrientation(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        size="small"
        aria-label="outlined primary button group"
      >
        <Button value={props.value} onClick={props.buttonclick}
                      
                                                                  >10</Button>
        <Button value={props.value2} onClick={props.buttonclick2}>30</Button>
        <Button value={props.value3} onClick={props.buttonclick3}>50</Button>
        <Button value={props.value4} onClick={props.buttonclick4}>100</Button>
      </ButtonGroup>
   
    </div>
  );
}
