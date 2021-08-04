import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

import { useState } from "react";

const NewMessage = ({ addNewMessage }) => {
	const [newMessage, setNewMessage] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		const id = Math.floor(Math.random() * 10000) + 1;

		addNewMessage({ content: newMessage, id: id, from_sender: true });

		setNewMessage("");
	};

	return (
		<Form onSubmit={onSubmit}>
			<div className="form-row align-items-center">
				<InputGroup className="mb-3" style={{ width: "50vx" }}>
					<FormControl
						aria-label="message"
						as="textarea"
						rows="3"
						placeholder="Type here."
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						required
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
	);
};

export default NewMessage;
