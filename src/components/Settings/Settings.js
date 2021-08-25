import { Container, Row } from "react-bootstrap";

import { useState, useEffect } from "react";

import Email from "./Email";
import Password from "./Password";

const Settings = ({ fetchData, sendData }) => {
	const [email, setEmail] = useState("");

	useEffect(() => {
		const getEmail = async () => {
			const emailFromServer = await fetchData("email");
			setEmail(emailFromServer.content);
		};

		getEmail();
	}, [fetchData]);

	return (
		<Container>
			<Row>
				<h2 className="align-middle">Άλλαξε τα στοιχεία σου.</h2>
			</Row>
			<Row>
				<Email emailFromServer={email} sendData={sendData}></Email>
			</Row>
			<Row>
				<Password sendData={sendData}></Password>
			</Row>
		</Container>
	);
};

export default Settings;
