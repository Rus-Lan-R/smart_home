import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { changeActiveDevice } from "../../redux/actions/devices.action"


export default function Device({ _id, device, status, picture }) {
  const [isActive, setActive] = useState(status);
  // const devices = useSelector((state) => state.devices);
  // const dispatch = useDispatch();

  const handleClick = () => {
    setActive(!isActive);
    // const deviceCopy = devices.slice();
    // deviceCopy[id].isActive = !deviceCopy[id].isActive;
    // dispatch(changeActiveDevice(deviceCopy))
  };
  const image = { width: "100%" }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{device}</h5>
        <img src={`/${picture}`} alt={picture} style={image} />
        <button onClick={handleClick} type="button">
          {isActive ? "Off" : "On"}
        </button>
      </div>
    </div>
  );
}
