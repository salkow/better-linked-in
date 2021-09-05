import {
	Form,
	Button,
	Container,
	FloatingLabel,
	Row,
	Col,
	Modal,
} from "react-bootstrap";

import { useHistory } from "react-router";

import { useState } from "react";

import axios from "axios";

import "./SignUpIn.css";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [job, setJob] = useState("");
	const [employmentInstitution, setEmploymentInstitution] = useState("");
	const [selectedFile, setSelectedFile] = useState();

	const [show, setShow] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const handleModalClose = () => setShow(false);
	const handleModalShow = (message) => {
		setModalMessage(message);
		setShow(true);
	};

	const history = useHistory();

	const sendUserInformation = async () => {
		try {
			const formData = new FormData();

			formData.append("firstName", firstName);
			formData.append("lastName", lastName);
			formData.append("email", email);
			formData.append("password", password);
			formData.append("phone", phone);
			formData.append("photo", selectedFile, selectedFile.name);
			formData.append("job", job);
			formData.append("company", employmentInstitution);

			await axios.post(
				"http://localhost:8081/api/v1/registration",
				formData
			);
		} catch (err) {
			handleModalShow("To email που διάλεξες είναι ήδη σε χρήση.");
			return;
		}

		history.push("/");
	};

	const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== repeatPassword) {
			e.preventDefault();
			handleModalShow("Οι κωδικοί δεν είναι οι ίδιοι.");
		} else {
			sendUserInformation();
		}
	};

	return (
		<Container>
			<div className="top">
				<h1 id="title" className="hidden">
					<span id="logo">
						Better <span>Linked In</span>
					</span>
				</h1>
			</div>

			<Form onSubmit={onSubmit}>
				<div className="input-text">
					<Row>
						<Form.Group as={Col} className="mb-3">
							<FloatingLabel label="Όνομα">
								<Form.Control
									type="text"
									placeholder="Όνομα"
									required
									onChange={(e) =>
										setFirstName(e.target.value)
									}
								/>
							</FloatingLabel>
						</Form.Group>

						<Form.Group as={Col} className="mb-3">
							<FloatingLabel label="Επίθετο">
								<Form.Control
									type="text"
									placeholder="Επίθετο"
									required
									onChange={(e) =>
										setLastName(e.target.value)
									}
								/>
							</FloatingLabel>
						</Form.Group>
					</Row>

					<Row>
						<Form.Group as={Col} className="mb-3">
							<FloatingLabel label="Email">
								<Form.Control
									type="email"
									placeholder="Email"
									required
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FloatingLabel>
						</Form.Group>
					</Row>

					<Row>
						<Form.Group as={Col} className="mb-3">
							<FloatingLabel label="Κωδικός">
								<Form.Control
									type="password"
									placeholder="Κωδικός"
									required
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</FloatingLabel>
						</Form.Group>

						<Form.Group as={Col} className="mb-3">
							<FloatingLabel label="Επανέλαβε τον κωδικό">
								<Form.Control
									type="password"
									placeholder="Επανέλαβε τον κωδικό"
									required
									onChange={(e) =>
										setRepeatPassword(e.target.value)
									}
								/>
							</FloatingLabel>
						</Form.Group>
					</Row>

					<Row>
						<Form.Group as={Col} className="mb-3">
							<FloatingLabel label="Τηλέφωνο">
								<Form.Control
									type="number"
									placeholder="number"
									required
									onChange={(e) => setPhone(e.target.value)}
								/>
							</FloatingLabel>
						</Form.Group>

						<Form.Group as={Col} className="mb-3">
							<Form.Label>Επέλεξε μια φωτογραφία σου</Form.Label>
							<Form.Control
								type="file"
								accept="image/*"
								required
								size="sm"
								onChange={changeHandler}
							/>
						</Form.Group>
					</Row>

					<Row>
						<Form.Group as={Col} className="mb-3">
							<FloatingLabel label="Εππαγελματική θέση">
								<Form.Control
									type="text"
									placeholder="Εππαγελματική θέση"
									required
									onChange={(e) => setJob(e.target.value)}
								/>
							</FloatingLabel>
						</Form.Group>

						<Form.Group as={Col} className="mb-3">
							<FloatingLabel label="Φορέας Απασχόλησης">
								<Form.Control
									type="text"
									placeholder="Φορέας Απασχόλησης"
									required
									onChange={(e) =>
										setEmploymentInstitution(e.target.value)
									}
								/>
							</FloatingLabel>
						</Form.Group>
					</Row>

					<div className="bottom-area-up">
						<Button
							variant="primary"
							type="submit"
							className="my-btn"
						>
							Submit
						</Button>
					</div>
				</div>
			</Form>

			<Modal show={show} onHide={handleModalClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Κάτι πήγε στραβά.</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalMessage}</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleModalClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default SignUp;
