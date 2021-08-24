import { Switch, Route } from "react-router-dom";

import "./SignUpIn.css";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const SignUpIn = ({ setAccessToken }) => {
	return (
		<div className="container">
			<div className="top">
				<h1 id="title" className="hidden">
					<span id="logo">
						Better <span>Linked In</span>
					</span>
				</h1>
			</div>
			<Switch>
				<Route path="/sign-in" exact>
					<SignIn setAccessToken={setAccessToken} />
				</Route>
				<Route path="/sign-up" component={SignUp} />
			</Switch>
		</div>
	);
};

export default SignUpIn;
