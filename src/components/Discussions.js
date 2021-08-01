import {
	Container,
	Row,
	Col,
	Button,
	ButtonGroup,
	Card,
	InputGroup,
	FormControl,
	Form,
} from "react-bootstrap";

import { useState, useEffect, useRef } from "react";

import "./Discussions.css";

const Discussions = () => {
	const [people, insertContact] = useState([
		{ id: 1, name: "Lucien Stein" },
		{ id: 2, name: "Oliver Giles" },
		{ id: 3, name: "Marcel Spence" },
		{ id: 4, name: "Norris Lawson" },
		{ id: 5, name: "Darryl Whitney" },
		{ id: 6, name: "Alfredo Small" },
		{ id: 7, name: "Lorie Humphrey" },
		{ id: 8, name: "Curt Davila" },
		{ id: 9, name: "Eloy Murray" },
		{ id: 10, name: "Haley Huerta" },
		{ id: 11, name: "Virginia Abbott" },
		{ id: 12, name: "Antwan Rosario" },
		{ id: 13, name: "Gina Barr" },
		{ id: 14, name: "Natalia Pennington" },
		{ id: 15, name: "Boyd Dalton" },
		{ id: 16, name: "Rachel Everett" },
		{ id: 17, name: "Lino Stone" },
		{ id: 18, name: "Sandra Benton" },
		{ id: 19, name: "Donna Raymond" },
		{ id: 20, name: "Sylvia Leslie" },
		{ id: 21, name: "Rosalie Murphy" },
		{ id: 22, name: "Erin Jaye" },
		{ id: 23, name: "Kelli Roger" },
		{ id: 24, name: "Jean Bethanie" },
	]);

	const [messages, insertMessage] = useState([]);

	useEffect(() => {
		const getMessages = async () => {
			const messagesFromServer = await fetchMessages();
			insertMessage(messagesFromServer);
		};

		getMessages();
	}, []);

	// Fetch Messages
	const fetchMessages = async () => {
		const res = await fetch("http://localhost:5000/messages");

		const data = await res.json();

		return data;
	};

	const [newMessage, setNewMessage] = useState("");

	const addContacts = (e) => {
		e.preventDefault();
		// const person = { id: 25, name: newMessage };
		// insertContact([...people, data]);
	};

	const addTask = async (message) => {
		const res = await fetch("http://localhost:5000/messages", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(message),
		});

		const data = await res.json();

		insertMessage([...messages, data]);

		scrollToLastMessage();
	};

	const addMessage = (e) => {
		e.preventDefault();

		if (!newMessage) {
			return;
		}

		addTask({ content: newMessage });

		setNewMessage("");
	};

	const lastMessage = useRef(null);

	const scrollToLastMessage = () => lastMessage.current.scrollIntoView();

	// Scroll to the last message when the page loads.
	useEffect(() => {
		scrollToLastMessage();
	});

	return (
		<div>
			<Container fluid>
				<Row>
					<Col xs={3}>
						<div className="contact-box">
							<div className="d-grid gap-2">
								{people.map((person) => (
									<ButtonGroup
										aria-label="Basic example"
										key={person.id.toString()}
									>
										<Button variant="info">
											{person.name}
										</Button>
									</ButtonGroup>
								))}
							</div>
						</div>
					</Col>
					<Col>
						<div className="message-box">
							<div className="d-grid gap-2">
								{messages.map((message, index) => (
									<Card key={index}>
										<Card.Body>
											<Card.Title>
												Name of the Sender
											</Card.Title>
											<Card.Text className="message">
												{message.content}
											</Card.Text>
										</Card.Body>
									</Card>
								))}
								<div ref={lastMessage} />
							</div>
						</div>

						<Form onSubmit={addMessage}>
							<div className="form-row align-items-center">
								<InputGroup
									className="mb-3"
									style={{ width: "50vx" }}
								>
									<FormControl
										aria-label="message"
										aria-describedby="basic-addon2"
										as="textarea"
										rows="3"
										placeholder="Type here."
										value={newMessage}
										onChange={(e) =>
											setNewMessage(e.target.value)
										}
									/>
									<Button
										size="sm"
										as="input"
										type="submit"
										value="Send"
										readOnly
									/>
								</InputGroup>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Discussions;
