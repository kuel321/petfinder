import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from './ButtonGroup';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        backgroundColor: 'white',
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

export default function SwitchesSize(props) {
  const [checked, setChecked] = React.useState(true);
  
  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };
  const classes = useStyles();

  return (
      <div className={classes.root}>
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography className={classes.heading}>Filters</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <FormGroup>
   
      <FormControlLabel
        control={<Switch checked={props.checkedDog} onChange={props.toggleCheckedDog} disabled={props.disabledDog} />}
        label="Dogs"
      />
       <FormControlLabel
        control={<Switch checked={props.checkedCat} onChange={props.toggleCheckedCat}  disabled={props.disabledCat}/>}
        label="Cats"
      />
       <FormControlLabel
        control={<Switch checked={props.checkedMale} onChange={props.toggleCheckedMale} disabled={props.disabledMale} />}
        label="Male"
      />
       <FormControlLabel
        control={<Switch checked={props.checkedFemale} onChange={props.toggleCheckedFemale} disabled={props.disabledFemale} />}
        label="Female"
      />
      <Accordion>
      <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography className={classes.heading}>Distance from ZIP</Typography>
    </AccordionSummary>
    <AccordionDetails>
       <form className={classes.root} noValidate autoComplete="off">
      <div>
        
        <TextField
        error={props.errortext}
          value={props.value}
          id={props.outline}
          label="Enter Zip"
          defaultValue={25526}
          helperText={props.fielderror}
          variant={props.outline}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <ButtonGroup value={props.buttonvalue1} buttonclick={props.buttonclick1}
        value2={props.buttonvalue2} buttonclick2={props.buttonclick2}
        value3={props.buttonvalue3} buttonclick3={props.buttonclick3}
        value4={props.buttonvalue4} buttonclick4={props.buttonclick4}
        
        />
      </div>
      </form>
      </AccordionDetails>
      </Accordion>
    </FormGroup>
    </AccordionDetails>
  </Accordion>

  
    </div>
  );
}