import { Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";

import Contacts from "./Contacts";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

import "./Discussions.css";

const Discussions = ({ navHeight, pageHeight, fetchData, sendData }) => {
	const [messages, setMessages] = useState([]);
	const [contacts, setContacts] = useState([]);
	const [senderName, setSenderName] = useState("");
	const [recipientName, setRecipientName] = useState("");
	const [recipientId, setRecipientId] = useState("");

	useEffect(() => {
		const getMessages = async () => {
			// fetch messages/id from the recipientId
			const messagesFromServer = await fetchData("messages");
			setMessages(messagesFromServer);
		};

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
	}, [fetchData]);

	const addNewMessage = async (message) => {
		sendData(message, "messages", "POST");

		setMessages([...messages, message]);
	};

	// Focus the messages of a specific contact.
	const focusContact = async (id, name) => {
		setRecipientName(name);
		setRecipientId(id);

		const messagesFromServer = await fetchData("messages");
		setMessages(messagesFromServer);
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
