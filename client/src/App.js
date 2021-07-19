import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/user.action";

import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignOut from "./components/Auth/SignOut/SignOut";
import DefaultContainer from "./components/DefaultContainer/DefaultContainer";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<DefaultContainer />

			<Switch>
				<Route exact path="/auth/signin">
					<SignIn />
				</Route>

				<Route exact path="/auth/signup">
					<SignUp />
				</Route>
				<Route exact path="/auth/signout">
					<SignOut />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
