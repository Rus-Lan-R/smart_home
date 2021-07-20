import { useEffect, useState } from "react";

const ElectricityConsumption = () => {
	const [powerConsumptions, setPowerConsumptions] = useState("");

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/devices/powerConsumptions`, {
			credentials: "include",
		})
			.then((request) => request.json())
			.then((data) => setPowerConsumptions(data))
			.catch((err) => console.log(err));
	}, []);

	return <div>Power Consumptions - {powerConsumptions}</div>;
};

export default ElectricityConsumption;
