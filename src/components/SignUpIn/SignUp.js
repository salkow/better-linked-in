import {
	Form,
	Button,
	Container,
	FloatingLabel,
	Row,
	Col,
} from "react-bootstrap";

import { useState } from "react";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [job, setJob] = useState("");
	const [employmentInstitution, setEmploymentInstitution] = useState("");

	const sendData = async (sign_up_data) => {
		const res = await fetch("http://localhost:5000/sign_up", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(sign_up_data),
		});

		await res.json();

		// const data = await res.json();
		// TODO: use this and handle the response.
	};

	const onSubmit = (e) => {
		if (password !== repeatPassword) {
			e.preventDefault();
			alert("Passwords don't match.");
		} else {
			sendData({
				firstName,
				lastName,
				email,
				password,
				phone,
				job,
				employmentInstitution,
			});
		}
	};

	return (
		<Container>
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
		</Container>
	);
};

export default SignUp;
