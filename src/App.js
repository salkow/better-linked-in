import Nav from "./components/Nav";
import MainPage from "./components/MainPage";
import Network from "./components/Network/Network";
import Adverts from "./components/Adverts/Adverts";
import Discussions from "./components/Discussions/Discussions";
import Notifications from "./components/Notifications/Notifications";
import Personal from "./components/Personal/Personal";
import Settings from "./components/Settings/Settings";

// import SignUpIn from "./components/SignUpIn/SignUpIn";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import React, { useState, useEffect } from "react";

function App() {
	const [navHeight, setNavHeight] = useState(0);
	const [pageHeight, setPageHeight] = useState(window.innerHeight);

	const updateDimensions = () => {
		setPageHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	return (
		<Router>
			<Nav setNavHeight={setNavHeight} />
			<Container fluid>
				<Row>
					<Switch>
						<Route path="/" exact>
							<MainPage />
						</Route>

						<Route path="/network" component={Network} />
						<Route path="/adverts">
							<Adverts
								navHeight={navHeight}
								pageHeight={pageHeight}
							/>
						</Route>
						<Route path="/discussions">
							<Discussions
								navHeight={navHeight}
								pageHeight={pageHeight}
							/>
						</Route>
						<Route
							path="/notifications"
							component={Notifications}
						/>
						<Route path="/personal">
							<Personal
								navHeight={navHeight}
								pageHeight={pageHeight}
							/>
						</Route>
						<Route path="/settings" component={Settings} />
					</Switch>
				</Row>
			</Container>
		</Router>
		// <SignUpIn />
	);
}

export default App;
