import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import "./SignUpIn.css";

const SignUpIn = () => {
	return (
		<Router>
			<div class="container">
				<div class="top">
					<h1 id="title" class="hidden">
						<span id="logo">
							Better <span>LinkedIn</span>
						</span>
					</h1>
				</div>
				<Switch>
					<Route path="/sign-in" exact component={SignIn} />
					<Route path="/sign-up" component={SignUp} />
				</Switch>
			</div>
		</Router>
	);
};

export default SignUpIn;
