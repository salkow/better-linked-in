import { Container, Row } from "react-bootstrap";

import { useState, useEffect } from "react";

import Email from "./Email";
import Password from "./Password";

const Settings = () => {
	const [email, setEmail] = useState("");

	useEffect(() => {
		const getEmail = async () => {
			const emailFromServer = await fetchEmail();
			setEmail(emailFromServer.content);
		};

		getEmail();
	}, []);

	// Fetch Email
	const fetchEmail = async () => {
		const res = await fetch("http://localhost:5000/email");

		const data = await res.json();

		return data;
	};

	// Add Email
	const addEmail = async (newEmail) => {
		const res = await fetch("http://localhost:5000/email", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newEmail),
		});

		const data = await res.json();

		setEmail(email, data.email);
	};

	// Add Password
	const addPassword = async (newPassword) => {
		const res = await fetch("http://localhost:5000/password", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newPassword),
		});

		await res.json();
	};

	return (
		<Container>
			<Row>
				<h2 className="align-middle">Άλλαξε τα στοιχεία σου.</h2>
			</Row>
			<Row>
				<Email emailFromServer={email} addEmail={addEmail}></Email>
			</Row>
			<Row>
				<Password addPassword={addPassword}></Password>
			</Row>
		</Container>
	);
};

export default Settings;
