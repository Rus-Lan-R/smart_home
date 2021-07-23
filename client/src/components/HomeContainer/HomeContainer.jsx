import ScenarioList from "./ScenarioList/ScenarioList"
import HousePlan from "./HousePlan/HousePlan"
import VoiceRecognitionButton from '../Buttons/VoiceRecognitionButton';
// import ElectricityConsumption from '../HomeContainer/ElectricityConsumption/ElectricityConsumption'
export default function HomeContainer() {
  return (
  <div style={{padding: '15px'}}> 
<ScenarioList />
<VoiceRecognitionButton/>
<HousePlan />
{/* <ElectricityConsumption /> */}
</div>
  )
}
