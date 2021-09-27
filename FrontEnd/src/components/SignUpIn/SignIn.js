import { Link, useLocation, Redirect } from "react-router-dom";
import { Form, Modal, Button, Container, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

import "./SignUpIn.css";

import axios from "axios";

const SignIn = ({
	setAccessToken,
	setIsAuthenticated,
	isAdmin,
	setIsAdmin,
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [show, setShow] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const handleModalClose = () => setShow(false);
	const handleModalShow = (message) => {
		setModalMessage(message);
		setShow(true);
	};

	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	let correctLogin = true;

	const { state } = useLocation();

	const login = async () => {
		let formData = new FormData();

		formData.append("username", email);
		formData.append("password", password);

		const config = {
			headers: { "content-type": "multipart/form-data" },
		};

		const url = "https://localhost:8043/perform_login";

		try {
			const res = await axios.post(url, formData, config);
			setAccessToken(res.data.access_token);

			if (res.data.role === "ADMIN") {
				setIsAdmin(true);
			}

			return true;
		} catch (err) {
			handleModalShow("Λάθος στοιχεία.");
			return false;
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		login()
			.then((res) => {
				correctLogin = res;
			})
			.then(() => {
				if (correctLogin === true) {
					setIsAuthenticated(true);
					setRedirectToReferrer(true);
				}
			});
	};

	if (redirectToReferrer === true) {
		if (!isAdmin) {
			let path = state?.from.pathname;

			if (path === "/admin") {
				path = "/home";
			}

			return <Redirect to={path || "/home"} />;
		} else {
			return <Redirect to="/admin" />;
		}
	}

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
					<Form.Group className="mb-3">
						<FloatingLabel label="Email">
							<Form.Control
								type="email"
								placeholder="Email"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className="mb-3">
						<FloatingLabel label="Password">
							<Form.Control
								type="password"
								placeholder="Password"
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FloatingLabel>
					</Form.Group>
					<div className="bottom-area-in">
						<Button
							variant="primary"
							type="submit"
							className="my-btn"
						>
							Submit
						</Button>
						<br />
						<Link to="/sign-up" className="signup-link">
							<u>Sign up</u>
						</Link>
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

export default SignIn;
