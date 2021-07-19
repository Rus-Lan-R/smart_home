import useInput from "../../hooks/inputHooks";
import { useDispatch } from "react-redux";
import { addRoom } from "../../redux/actions/rooms.action";

export default function AddRoom() {
	const input = useInput({ placeholder: "Еnter room's name", type: "text" });

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const responseAddRoom = await fetch(`${process.env.REACT_APP_API_URL}/api/room`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				room: input.getValue(),
			}),
		});
		const newRoom = await responseAddRoom.json();

		dispatch(addRoom(newRoom));
		input.clear();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3> Create new Room</h3>
			<input {...input.tagAttrs} />
			<button type="submit">Create</button>
		</form>
	);
}
