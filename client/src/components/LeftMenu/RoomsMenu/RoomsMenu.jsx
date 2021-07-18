import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "../../../redux/actions/rooms.action";
import {getDevices } from "../../../redux/actions/devices.action"

export default function RoomsMenu() {
  const items = useSelector((state) => state.rooms.items);
  const userId = useSelector((state) => state.user?._id)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(userId));
  }, []);

  return (
    <div className="row my-5">
      {items.map((el) => (
        <div key={el._id} className="col-4">
          <Link onClick={() => dispatch(getDevices(el._id))} to={`/home/${el.room}`}>
            <span>{el.room}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
