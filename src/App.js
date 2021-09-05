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

import axios from "axios";

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
			console.log("Error while fetching resource.");
			return "";
		}

		return await res.json();
	};

	const fetchDataNoJSON = async (path) => {
		const res = axios(`http://localhost:8081/api/v1/${path}`, {
			headers: { Authorization: "Bearer " + accessToken },
		});

		return res;
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

		if (!res.ok) {
			return "error";
		}

		return res.data;
	};

	const sendFormData = async (form, path) => {
		const res = await axios({
			method: "POST",
			url: `http://localhost:8081/api/v1/${path}`,
			data: form,
			headers: {
				Authorization: "Bearer " + accessToken,
				credentials: "include",
			},
		});

		if (!res.ok) {
			return "error";
		}
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

				<Route path="/sign-up">
					<SignUp />
				</Route>

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
									sendFormData={sendFormData}
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
									fetchDataNoJSON={fetchDataNoJSON}
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
