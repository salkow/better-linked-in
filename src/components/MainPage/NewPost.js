import { useState } from "react";
import {
	InputGroup,
	Modal,
	Col,
	FormControl,
	Button,
	Form,
} from "react-bootstrap";

const NewPost = ({ setPosts, sendFormData }) => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFileSelected, setIsFileSelected] = useState(false);
	const [message, setMessage] = useState("");

	const [show, setShow] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const handleModalClose = () => setShow(false);
	const handleModalShow = (message) => {
		setModalMessage(message);
		setShow(true);
	};

	const onClick = (e) => {
		e.preventDefault();

		if (message.length === 0 && isFileSelected === false) {
			handleModalShow(
				"Θα πρέπει να προσθέσεις κάποιο κείμενο ή πολυμέσο για να κάνεις μια δημοσίευση."
			);
			return;
		}

		let typeOfMedia = "";

		const formData = new FormData();

		if (isFileSelected) {
			if (selectedFile.type.match("image.*")) {
				typeOfMedia = "image";
			} else if (selectedFile.type.match("video.*")) {
				typeOfMedia = "video";
			} else if (selectedFile.type.match("audio.*")) {
				typeOfMedia = "audio";
			} else {
				handleModalShow(
					"Το αρχείο θα πρέπει να είνα εικόνα, βίντεο ή ήχος."
				);
				return;
			}

			formData.append("media", selectedFile, selectedFile.name);
		} else {
			formData.append("media", null);
		}

		formData.append("text", message);
		formData.append("typeofMedia", typeOfMedia);

		sendFormData(formData, "post");
	};

	const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFileSelected(true);
	};

	return (
		<Col xs="7" className="all_posts">
			<InputGroup>
				<FormControl
					placeholder="Γράψε κάτι"
					as="textarea"
					rows="4"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</InputGroup>

			<InputGroup>
				<Form.Group as={Col} className="mb-3">
					<Form.Label>Επέλεξε ένα αρχείο</Form.Label>
					<Form.Control
						type="file"
						onChange={changeHandler}
						size="sm"
					/>
				</Form.Group>
			</InputGroup>

			<Button onClick={onClick}>Αποστολή</Button>

			<Modal show={show} onHide={handleModalClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Κάτι πήγε στραβά.</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalMessage}</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleModalClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</Col>
	);
};

export default NewPost;
