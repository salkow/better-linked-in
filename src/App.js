import Nav from "./components/Nav";
import MainPage from "./components/MainPage/MainPage";
import Network from "./components/Network/Network";
import Adverts from "./components/Adverts/Adverts";
import Discussions from "./components/Discussions/Discussions";
import Notifications from "./components/Notifications/Notifications";
import Personal from "./components/Personal/Personal";
import Settings from "./components/Settings/Settings";
import Admin from "./components/Admin/Admin";
import SignIn from "./components/SignUpIn/SignIn";
import SignUp from "./components/SignUpIn/SignUp";
import PrivateRoute from "./components/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import React, { useState, useEffect } from "react";

function App() {
	const [navHeight, setNavHeight] = useState(0);
	const [pageHeight, setPageHeight] = useState(window.innerHeight);
	const [accessToken, setAccessToken] = useState("");

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const fetchData = async (path) => {
		const res = await fetch(`http://localhost:8081/api/v1/${path}`, {
			method: "GET",
			headers: new Headers({
				Authorization: "Bearer " + accessToken,
				credentials: "include",
			}),
		});

		if (!res.ok) {
			console.log("Error while fetching resource");
			return "";
		}

		// if (res.hasOwnProperty("status") && res.status === 401) {
		// }

		return await res.json();
	};

	const sendData = async (data, path, post_put) => {
		const res = await fetch(`http://localhost:8081/api/v1/${path}`, {
			method: post_put,
			headers: {
				Authorization: "Bearer " + accessToken,
				"Content-type": "application/json",
				credentials: "include",
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
			<Switch>
				<Route path="/" exact>
					<SignIn
						setAccessToken={setAccessToken}
						setIsAuthenticated={setIsAuthenticated}
					/>
				</Route>

				<Route path="/sign-up" component={SignUp} />

				<PrivateRoute isAuthenticated={isAuthenticated} path="/admin">
					<Admin fetchData={fetchData} />
				</PrivateRoute>

				<Route>
					<Nav setNavHeight={setNavHeight} />
					<Container fluid>
						<Row>
							<PrivateRoute
								isAuthenticated={isAuthenticated}
								path="/home"
								exact
							>
								<MainPage
									fetchData={fetchData}
									sendData={sendData}
								/>
							</PrivateRoute>

							<PrivateRoute
								isAuthenticated={isAuthenticated}
								path="/network"
							>
								<Network
									fetchData={fetchData}
									sendData={sendData}
								/>
							</PrivateRoute>
							<PrivateRoute
								isAuthenticated={isAuthenticated}
								path="/adverts"
							>
								<Adverts
									navHeight={navHeight}
									pageHeight={pageHeight}
									fetchData={fetchData}
									sendData={sendData}
								/>
							</PrivateRoute>
							<PrivateRoute
								isAuthenticated={isAuthenticated}
								path="/discussions"
							>
								<Discussions
									navHeight={navHeight}
									pageHeight={pageHeight}
									fetchData={fetchData}
									sendData={sendData}
								/>
							</PrivateRoute>
							<PrivateRoute
								isAuthenticated={isAuthenticated}
								path="/notifications"
							>
								<Notifications
									fetchData={fetchData}
									sendData={sendData}
								/>
							</PrivateRoute>
							<PrivateRoute
								isAuthenticated={isAuthenticated}
								path="/personal"
							>
								<Personal
									navHeight={navHeight}
									pageHeight={pageHeight}
									accessToken={accessToken}
									fetchData={fetchData}
									sendData={sendData}
								/>
							</PrivateRoute>

							<PrivateRoute
								isAuthenticated={isAuthenticated}
								path="/settings"
							>
								<Settings
									fetchData={fetchData}
									sendData={sendData}
								/>
							</PrivateRoute>
						</Row>
					</Container>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
