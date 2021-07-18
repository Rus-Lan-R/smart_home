import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDevices } from "../../../redux/actions/devices.action";
import Device from "../Device/Device"



export default function Devices(room) {
  const list = useSelector((state) => state.devices.items);
  console.log(room)
  // const roomName = useSelector((state) => state.rooms.room)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getDevices(room));
  }, [room]);

  return (
    <div className="row my-5">
      {list.map((el) => (
        <div key={el._id} className="col-4">
          <Device {...el} />
        </div>
      ))}
    </div>
  );
}

