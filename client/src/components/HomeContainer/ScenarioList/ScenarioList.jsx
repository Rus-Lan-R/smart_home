// import { getScenarios } from "../../../redux/actions/scenarios.action";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
import Scenario from "../Scenario/Scenario";

import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function ScenarioList() {
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
      picture: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

		},
		{
			name: "I'm in home",
			status: false,
      picture: "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",

		},
		{
			name: "I'm not home",
			status: false,
      picture: "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

		},
    {
      name: "Order 66",
      status: false,
      picture: "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

    }
	];

	// const dispatch = useDispatch();

	// useEffect(() => {
	//   dispatch(getScenarios());
	// }, []);

	return (
		<Carousel responsive={responsive}>
			{items.map((item, i) => (
				<Scenario key={i} item={item} />
			))}
		</Carousel>
	);
}
