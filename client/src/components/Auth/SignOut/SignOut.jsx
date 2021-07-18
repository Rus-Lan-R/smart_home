import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signOut } from "../../../redux/actions/user.action";

const SignOut = () => {
	console.log("signout");
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		dispatch(signOut());
		history.push("/");
	}, []);

	return null;
};

export default SignOut;