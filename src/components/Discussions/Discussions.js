import { Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";

import Contacts from "./Contacts";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

import "./Discussions.css";

const Discussions = ({ navHeight, pageHeight }) => {
	const [messages, setMessages] = useState([]);
	const [contacts, setContacts] = useState([]);
	const [senderName, setSenderName] = useState("");
	const [recipientName, setRecipientName] = useState("");
	const [recipientId, setRecipientId] = useState("");

	const getMessages = async () => {
		// fetch messages/id from the recipientId
		const messagesFromServer = await fetchData("messages");
		setMessages(messagesFromServer);
	};

	useEffect(() => {
		const getContacts = async () => {
			const contactsFromServer = await fetchData("contacts");
			setContacts(contactsFromServer);
		};

		const getSenderName = async () => {
			const dataFromServer = await fetchData("sign_up");

			const userName =
				dataFromServer.firstName + " " + dataFromServer.lastName;

			setSenderName(userName);
		};

		const getRecipientName = async () => {
			const recipientNameFromServer = await fetchData("recipient_name");

			setRecipientName(recipientNameFromServer.content);
		};

		// Check if the user wants to chat with someone in particular or just wants to open
		// the discussions page.
		const authResult = new URLSearchParams(window.location.search);
		const id = authResult.get("id");

		if (id != null) {
			setRecipientId(id);
		}

		getMessages();
		getContacts();
		getSenderName();
		getRecipientName();
	}, [getMessages]);

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
		setRecipientName(name);
		setRecipientId(id);

		getMessages();
	};

	return (
		<div>
			<Container fluid>
				<Row>
					<Col sm="2">
						{contacts.length === 0 ? (
							<h1>Δεν υπάρχουν επαφές</h1>
						) : (
							<Contacts
								contacts={contacts}
								focusContact={focusContact}
								navHeight={navHeight}
								pageHeight={pageHeight}
							/>
						)}
					</Col>
					<Col>
						{messages.length === 0 ? (
							<h1>Δεν υπάρχουν μηνύματα</h1>
						) : (
							<Messages
								messages={messages}
								senderName={senderName}
								recipientName={recipientName}
								navHeight={navHeight}
								pageHeight={pageHeight}
							/>
						)}

						<br />
						<NewMessage addNewMessage={addNewMessage} />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Discussions;
