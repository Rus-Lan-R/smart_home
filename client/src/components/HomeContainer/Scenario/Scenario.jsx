import { Paper, Button } from '@material-ui/core'
import { useState, useEffect } from "react";
import {selectScenario} from "../../../redux/actions/scenarios.action"
import {  useDispatch } from "react-redux";
import {Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Scenario({item}) {
  const classes = useStyles();
const [isActive, setIsActive] = useState(false)
const dispatch = useDispatch();

const handleClick =(nameScenario, isActive) => {
      dispatch(selectScenario( {nameScenario, isActive}));
      setIsActive(!isActive)
}

    return (
      <Paper>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <div>{isActive? <Typography variant="subtitle1" component="div" style={{color: "lightgreen"}}>Started</Typography> : ""}</div>
            {/* <img src={`/${item.picture}`} alt={item.picture} /> */}
            <img src={`/${item.picture}`} alt={item.picture} />
            <Button className="CheckButton" onClick={() => handleClick(item.name, isActive)}>
            {isActive? "Stop" : "Start"}
            </Button>
        </Paper>
    )
}
