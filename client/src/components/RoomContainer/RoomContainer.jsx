import Devices from "./DeviceList/DeviceList"
import { useParams } from "react-router-dom"

export default function RoomContainer() {
  const {roomName} = useParams()
  return (<> 
  <Devices room={roomName}/>
  </>
  )
}

