import { Container, Row } from "react-bootstrap";

import { useState, useEffect } from "react";

import Email from "./Email";
import Password from "./Password";

const Settings = ({ fetchDataNoJSON, sendData }) => {
	const [email, setEmail] = useState("");

	useEffect(() => {
		const getEmail = async () => {
			const emailFromServer = await fetchDataNoJSON("email");
			setEmail(emailFromServer.data);
		};

		getEmail();
	}, [fetchDataNoJSON]);

	return (
		<Container>
			<Row>
				<h2 className="align-middle">Άλλαξε τα στοιχεία σου.</h2>
			</Row>
			<Row>
				<Email
					email={email}
					setEmail={setEmail}
					sendData={sendData}
				></Email>
			</Row>
			<Row>
				<Password sendData={sendData}></Password>
			</Row>
		</Container>
	);
};

export default Settings;
