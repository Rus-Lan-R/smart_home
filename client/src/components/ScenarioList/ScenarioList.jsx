import { getScenarios } from "../../redux/actions/scenarios.action";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Scenario from "../Scenario/Scenario";

import React from 'react';
import Carousel from 'react-material-ui-carousel'

export default function ScenariosMenu() {
  const items = useSelector((state) => state.scenarios.items);
  const {userId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScenarios(userId));
  }, []);

  return (
    <Carousel>
      {
        items.map( (item, i) => <Scenario key={i} item={item}/> )
      }
    </Carousel>      
  ) 
}

