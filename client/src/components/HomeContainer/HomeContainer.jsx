import ScenarioList from "./ScenarioList/ScenarioList"
import HousePlan from "./HousePlan/HousePlan"
import VoiceRecognitionButton from '../Buttons/VoiceRecognitionButton';
export default function HomeContainer() {
  return (
  <div style={{padding: '14px'}}> 
<ScenarioList />
<VoiceRecognitionButton/>
<HousePlan />
{/* 
<ElectricityConsumption />   */}
</div>
  )
}
