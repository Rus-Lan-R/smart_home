import useInput from "../../hooks/inputHooks";
import { useDispatch } from "react-redux";
import { addRoom } from "../../redux/actions/rooms.action";
import * as React from 'react'
import { IconPicker } from 'react-fa-icon-picker'
import { useState } from 'react';


export default function AddRoom() {
	const input = useInput({ placeholder: "Еnter room's name", type: "text" });
  const [value, setValue] = useState("")

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
        picture: value,
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
      <label>Choose icon</label>
      <IconPicker value={value} onChange={(v) => setValue(v)} />
			<input {...input.tagAttrs} />
			<button type="submit">Create</button>
		</form>
	);
}
