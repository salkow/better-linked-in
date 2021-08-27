import { Link, useLocation, Redirect } from "react-router-dom";
import { Form, Button, Container, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

import "./SignUpIn.css";

import axios from "axios";

const SignIn = ({ setAccessToken, setIsAuthenticated }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	const { state } = useLocation();

	const onSubmit = (e) => {
		e.preventDefault();

		let formData = new FormData();

		formData.append("username", email);
		formData.append("password", password);

		const config = {
			headers: { "content-type": "multipart/form-data" },
		};

		const url = "http://localhost:8081/perform_login";

		axios.post(url, formData, config).then((response) => {
			setAccessToken(response.data.access_token);
		});

		setIsAuthenticated(true);
		setRedirectToReferrer(true);
	};

	if (redirectToReferrer === true) {
		return <Redirect to={state?.from || "/settings"} />;
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
		</Container>
	);
};

export default SignIn;
