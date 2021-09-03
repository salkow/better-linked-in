import { Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";

import Contacts from "./Contacts";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

import "./Discussions.css";

const Discussions = ({ navHeight, pageHeight, fetchData, sendData }) => {
	const [messages, setMessages] = useState([]);
	const [contacts, setContacts] = useState([]);

	const [myName, setMyName] = useState("");
	const [myId, setMyId] = useState("");

	const [friendName, setFriendName] = useState("");
	const [friendId, setFriendId] = useState("");

	useEffect(() => {
		const getMessages = async (id) => {
			const messagesFromServer = await fetchData("messages/" + id);
			setMessages(messagesFromServer);
		};

		const getContacts = async () => {
			const contactsFromServer = await fetchData("contacts");
			setContacts(contactsFromServer);
		};

		const getMyId = async () => {
			const idFromServer = await fetchData("id");
			setMyId(idFromServer);
		};

		const getMyName = async () => {
			const nameFromServer = await fetchData("name");
			setMyId(nameFromServer);
		};

		const getFriendName = async (id) => {
			const nameFromServer = await fetchData("name/" + id);
			setFriendName(nameFromServer);
		};

		const getLastContactId = async () => {
			const idFromServer = await fetchData("lastContactId");
			setFriendId(idFromServer);
		};

		// Check if the user wants to chat with someone in particular or just wants to open
		// the discussions page.
		const authResult = new URLSearchParams(window.location.search);
		const id = authResult.get("id");

		if (id != null) {
			setFriendId(id);
			getFriendName();
			getMessages(id);
		} else {
			getLastContactId();
			getFriendName(friendId);
			getMessages("");
		}

		getContacts();
		getMyId();
		getMyName();
	}, [fetchData]);

	const addNewMessage = async (message) => {
		sendData(message, "sendMessage", "PUT");

		setMessages([...messages, message]);
	};

	// Focus the messages of a specific contact.
	const focusContact = async (id, name) => {
		setFriendName(name);
		setFriendId(id);

		const messagesFromServer = await fetchData("messages/" + friendId);
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
								myName={myName}
								myId={myId}
								friendName={friendName}
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
