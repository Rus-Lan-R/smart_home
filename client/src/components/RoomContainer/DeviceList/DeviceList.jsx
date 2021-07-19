import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDevices } from "../../../redux/actions/devices.action";
import Device from "../Device/Device";

export default function DevicesList() {
	const devices = useSelector((state) => state.devices.items);

	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(getDevices(room));
	// }, []);

	return (
		<div>
			{devices.map((el) => (
				<div key={el._id} className="col-4">
					<Device {...el} />
					<div>wqeqr</div>
				</div>
			))}
		</div>
	);
}
