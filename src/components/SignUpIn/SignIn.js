import { Link, useHistory } from "react-router-dom";
import { Form, Button, Container, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

import axios from "axios";

const SignIn = ({ setAccessToken }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const onSubmit = (e) => {
		e.preventDefault();

		let formData = new FormData();

		formData.append("username", email); //append the values with key, value pair
		formData.append("password", password);

		const config = {
			headers: { "content-type": "multipart/form-data" },
		};

		const url = "http://localhost:8081/perform_login";

		axios.post(url, formData, config).then((response) => {
			console.log(response.data.access_token);

			setAccessToken(response.data.access_token);

			history.push("/personal");
		});
	};

	return (
		<Container>
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
						<Link to="/sign-up">
							<u>Sign up here.</u>
						</Link>
					</div>
				</div>
			</Form>
		</Container>
	);
};

export default SignIn;
