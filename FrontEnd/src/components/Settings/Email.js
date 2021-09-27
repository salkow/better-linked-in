import {
	Form,
	Button,
	InputGroup,
	FormControl,
	FloatingLabel,
	Modal,
} from "react-bootstrap";

import { useState } from "react";

const Email = ({ email, setEmail, sendData, setIsAuthenticated }) => {
	const [show, setShow] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const handleModalClose = () => setShow(false);
	const handleModalShow = (message) => {
		setModalMessage(message);
		setShow(true);
	};

	const sendEmail = async () => {
		const res = await sendData(email, "email", "PUT");
		if (res === "error") {
			handleModalShow("Το email δεν είναι διαθέσιμο.");
		} else {
			setIsAuthenticated(false);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		sendEmail();
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
