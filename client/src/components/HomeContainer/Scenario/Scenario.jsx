import { Paper, Button } from '@material-ui/core'
import { useState, useEffect } from "react";
import {selectScenario} from "../../../redux/actions/scenarios.action"
import {  useDispatch } from "react-redux";


export default function Scenario({item}) {
const [isActive, setIsActive] = useState(false)
const dispatch = useDispatch();

const handleClick =(nameScenario, isActive) => {
      dispatch(selectScenario( {nameScenario, isActive}));
      setIsActive(!isActive)
}

    return (
      <Paper>
            <h2>{item.name}</h2>
            <p>{isActive? 'Started':''}</p>
            <img src={`/${item.picture}`} alt={item.picture} />
            <Button className="CheckButton" onClick={() => handleClick(item.name, isActive)}>
            {isActive? "Stop" : "Start"}
            </Button>
        </Paper>
    )
}
