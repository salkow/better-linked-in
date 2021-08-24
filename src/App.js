import Nav from "./components/Nav";
import MainPage from "./components/MainPage/MainPage";
import Network from "./components/Network/Network";
import Adverts from "./components/Adverts/Adverts";
import Discussions from "./components/Discussions/Discussions";
import Notifications from "./components/Notifications/Notifications";
import Personal from "./components/Personal/Personal";
import Settings from "./components/Settings/Settings";
import SignUpIn from "./components/SignUpIn/SignUpIn";
import Admin from "./components/Admin/Admin";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import React, { useState, useEffect } from "react";

function App() {
	const [navHeight, setNavHeight] = useState(0);
	const [pageHeight, setPageHeight] = useState(window.innerHeight);
	const [accessToken, setAccessToken] = useState("");

	const fetchData = async (path) => {
		const res = await fetch(`http://localhost:5000/${path}`, {
			method: "GET",
			headers: new Headers({
				Authorization: "Bearer" + accessToken,
			}),
		});

		const data = await res.json();

		return data;
	};

	const sendData = async (data, path, post_put) => {
		const res = await fetch(`http://localhost:5000/${path}`, {
			method: post_put,
			headers: {
				Authorization: "Bearer" + accessToken,
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const returned_data = await res.json();
		return returned_data;
	};

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
							<MainPage
								fetchData={fetchData}
								sendData={sendData}
							/>
						</Route>

						<Route path="/network">
							<Network
								fetchData={fetchData}
								sendData={sendData}
							/>
						</Route>
						<Route path="/adverts">
							<Adverts
								navHeight={navHeight}
								pageHeight={pageHeight}
								fetchData={fetchData}
								sendData={sendData}
							/>
						</Route>
						<Route path="/discussions">
							<Discussions
								navHeight={navHeight}
								pageHeight={pageHeight}
								fetchData={fetchData}
								sendData={sendData}
							/>
						</Route>
						<Route path="/notifications">
							<Notifications
								fetchData={fetchData}
								sendData={sendData}
							/>
						</Route>
						<Route path="/personal">
							<Personal
								navHeight={navHeight}
								pageHeight={pageHeight}
								accessToken={accessToken}
								fetchData={fetchData}
								sendData={sendData}
							/>
						</Route>

						<Route path="/settings">
							<Settings
								fetchData={fetchData}
								sendData={sendData}
							/>
						</Route>

						<Route path="/admin">
							<Admin fetchData={fetchData} />
						</Route>

						<SignUpIn setAccessToken={setAccessToken} />
					</Switch>
				</Row>
			</Container>
		</Router>
	);
}

export default App;
