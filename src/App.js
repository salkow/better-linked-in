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

import "bootstrap/dist/css/bootstrap.min.css";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import React, { useState, useEffect } from "react";

function App() {
	const [navHeight, setNavHeight] = useState(0);
	const [pageHeight, setPageHeight] = useState(window.innerHeight);
	const [accessToken, setAccessToken] = useState("");

	const history = useHistory();

	console.log("history: " + history);

	const fetchData = async (path) => {
		console.log("access_token: " + accessToken);

		const res = await fetch(`http://localhost:8081/api/v1/${path}`, {
			method: "GET",
			headers: new Headers({
				Authorization: "Bearer " + accessToken,
				credentials: "include",
			}),
		});

		const x = 3;

		if (x === 3) {
			history.push("/perform_login");
		}
		// if (res.hasOwnProperty("status") && res.status === 401) {
		// }

		const data = await res.json();

		return data;
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
		<div>
			<Router>
				<Switch>
					<Route path="/" exact>
						<SignIn setAccessToken={setAccessToken} />
					</Route>

					<Route path="/sign-up" component={SignUp} />

					<Route path="/admin">
						<Admin fetchData={fetchData} />
					</Route>

					<div>
						<Nav setNavHeight={setNavHeight} />
						<Container fluid>
							<Row>
								<Route path="/home" exact>
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
							</Row>
						</Container>
					</div>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
