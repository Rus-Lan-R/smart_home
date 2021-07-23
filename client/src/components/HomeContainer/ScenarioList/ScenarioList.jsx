// import { getScenarios } from "../../../redux/actions/scenarios.action";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
import Scenario from "../Scenario/Scenario";
import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: 200
  },
}));

export default function ScenarioList() {

  const classes = useStyles();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
	// const items = useSelector((state) => state.scenarios.items);
	const items = [
		{
			name: "Ruslik party",
			status: false,
      picture: "1.png",

		},
		{
			name: "Ptichka v gnezde",
			status: false,
      picture: "2.png",

		},
		{
			name: "Sector Clear",
			status: false,
      picture: "ghost_gif.gif",

		},
    {
      name: "Order 66",
      status: false,
      picture: "4.png",

    },
    {
      name: "Relax",
      status: false,
      picture: "5.gif",
    },
    {
      name: "BoomBoom",
      status: false,
      picture: "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    },
	];

	// const dispatch = useDispatch();

	// useEffect(() => {
	//   dispatch(getScenarios());
	// }, []);

	return (
		<Carousel responsive={responsive}>
			{items.map((item, i) => (
				<Scenario className={classes.root}  key={i} item={item} />
			))}
		</Carousel>
	);
}

