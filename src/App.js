import Nav from "./components/Nav";
import MainPage from "./components/MainPage";
import Network from "./components/Network";
import Adverts from "./components/Adverts";
import Discussions from "./components/Discussions";
import Notifications from "./components/Notifications";
import Personal from "./components/Personal/Personal";
import Settings from "./components/Settings/Settings";

// import SignUpIn from "./components/SignUpIn";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Router>
			<Nav />
			<Switch>
				<Route path="/" exact component={MainPage} />
				<Route path="/network" component={Network} />
				<Route path="/adverts" component={Adverts} />
				<Route path="/discussions" component={Discussions} />
				<Route path="/notifications" component={Notifications} />
				<Route path="/personal" component={Personal} />
				<Route path="/settings" component={Settings} />
			</Switch>
		</Router>
		// <SignUpIn />
	);
}

export default App;
