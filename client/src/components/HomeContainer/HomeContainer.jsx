import ScenarioList from "./ScenarioList/ScenarioList";
import ElectricityConsumption from "./ElectricityConsumption/ElectricityConsumption";
export default function HomeContainer() {
	return (
		<>
			<ScenarioList />
			{/* <HousePlan />*/}
			<ElectricityConsumption />
		</>
	);
}
