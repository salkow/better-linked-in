import {
	Form,
	Button,
	InputGroup,
	FormControl,
	FloatingLabel,
} from "react-bootstrap";

import { useState, useEffect } from "react";

const Email = ({ emailFromServer, sendData }) => {
	const [email, setEmail] = useState("");

	useEffect(() => {
		setEmail(emailFromServer);
	}, [setEmail, emailFromServer]);

	const [show, setShow] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const handleModalClose = () => setShow(false);
	const handleModalShow = (message) => {
		setModalMessage(message);
		setShow(true);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const res = sendData({ email }, "email", "PUT");
		if (res.status === 302) {
			handleModalShow("Το email δεν είναι διαθέσιμο.");
			return;
		}
	};

	return (
		<Form onSubmit={onSubmit}>
			<div className="form-row align-items-center col-md-5">
				<InputGroup
					hasValidation
					className="mb-3"
					style={{ width: "50vx" }}
				>
					<FloatingLabel controlId="floatingInput" label="Email">
						<FormControl
							placeholder="Email"
							aria-label="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							required
							htmlSize="31"
						/>
					</FloatingLabel>
					<Button
						size="sm"
						as="input"
						type="submit"
						value="Submit"
						style={{ padding: "10px" }}
						readOnly
					/>
				</InputGroup>
			</div>

			<Modal show={show} onHide={handleModalClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Κάτι πήγε στραβά.</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalMessage}</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleModalClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</Form>
	);
};

export default Email;
