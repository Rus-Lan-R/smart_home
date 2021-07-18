import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDevices } from "../../../redux/actions/devices.action";
import Device from "../Device/Device"
import { useParams } from "react-router-dom"



export default function Devices() {
  const list = useSelector((state) => state.devices.items);
  const userId = useSelector((state) => state.users._id)
  const roomId = useSelector((state) => state.rooms._id)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getDevices(userId, roomId));
  }, [roomId]);

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

