import { Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";

import Contacts from "./Contacts";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

import "./Discussions.css";

const Discussions = () => {
	const [messages, setMessages] = useState([]);
	const [contacts, setContacts] = useState([]);
	const [senderName, setSenderName] = useState("");
	const [recipientName, setRecipientName] = useState("");

	useEffect(() => {
		const getMessages = async () => {
			const messagesFromServer = await fetchData("messages");
			setMessages(messagesFromServer);
		};

		const getContacts = async () => {
			const contactsFromServer = await fetchData("contacts");
			setContacts(contactsFromServer);
		};

		const getSenderName = async () => {
			const dataFromServer = await fetchData("sign_in");

			const userName =
				dataFromServer.firstName + " " + dataFromServer.lastName;

			setSenderName(userName);
		};

		const getRecipientName = async () => {
			const recipientNameFromServer = await fetchData("recipient_name");
			setRecipientName(recipientNameFromServer.content);
		};

		getMessages();
		getContacts();
		getSenderName();
		getRecipientName();
	}, []);

	const fetchData = async (topic) => {
		const res = await fetch(`http://localhost:5000/${topic}`);

		const data = await res.json();

		return data;
	};

	const addNewMessage = async (message) => {
		const res = await fetch("http://localhost:5000/messages", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(message),
		});

		const data = await res.json();

		setMessages([...messages, data]);
	};

	// Focus the messages of a specific contact.
	const focusContact = (id, name) => {
		console.log(id);
		console.log(name);
		// Fetch messages with the id.
		// Set the id.
		// setMessages([...messages, data]);
	};

	return (
		<div>
			<Container fluid>
				<Row>
					<Col xs={3}>
						<Contacts
							contacts={contacts}
							focusContact={focusContact}
						/>
					</Col>
					<Col>
						<Messages
							messages={messages}
							senderName={senderName}
							recipientName={recipientName}
						/>
						<NewMessage addNewMessage={addNewMessage} />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Discussions;
