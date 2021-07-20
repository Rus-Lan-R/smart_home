// import { getScenarios } from "../../../redux/actions/scenarios.action";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
import Scenario from "../Scenario/Scenario";

import React from 'react';
import Carousel from 'react-material-ui-carousel'

export default function ScenarioList() {
  // const items = useSelector((state) => state.scenarios.items);
  const items = [
    {
      name: "Ruslik party",
      status: false
    },
    {
      name: "I'm in home",
      status: false
    },
    {
      name: "I'm not home",
      status: false
    }
  ]



  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getScenarios());
  // }, []);

  return (
    <Carousel>
      {
        items.map( (item, i) => <Scenario key={i} item={item}/> )
      }
    </Carousel>      
  ) 
}

