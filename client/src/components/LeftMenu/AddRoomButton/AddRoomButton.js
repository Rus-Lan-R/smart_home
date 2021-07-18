import { Link } from "react-router-dom";

export default function AddRoomButton() {
  return (
    <Link to={`/addRoom/`}>
      <span>Add Room</span>
    </Link>)
}
