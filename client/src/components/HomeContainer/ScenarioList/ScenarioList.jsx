import { getScenarios } from "../../../redux/actions/scenarios.action";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Scenario from "../Scenario/Scenario";

import React from "react";
import Carousel from "react-material-ui-carousel";

export default function ScenarioList() {
	// const items = useSelector((state) => state.scenarios.items);
	// eslint-disable-next-line
	const [isActive, setIsActive] = useState(false);
	const items = [
		{
			name: "Elbrus party",
			status: true,
		},
		{
			name: "I'm in home",
			status: false,
		},
		{
			name: "I'm not home",
			status: false,
		},
	];
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/scenario`)
			.then((response) => response.json())
			.then((data) => setIsActive(data));
	}, []);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getScenarios());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Carousel>
			{items.map((item, i) => (
				<Scenario key={i} item={item} />
			))}
		</Carousel>
	);
}
