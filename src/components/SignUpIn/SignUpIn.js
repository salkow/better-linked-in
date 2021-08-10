import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./SignUpIn.css";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const SignUpIn = () => {
	return (
		<Router>
			<div className="container">
				<div className="top">
					<h1 id="title" className="hidden">
						<span id="logo">
							Better <span>Linked In</span>
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
