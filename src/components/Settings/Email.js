import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

import { useState, useEffect } from "react";

const Email = ({ emailFromServer, addEmail }) => {
	const [email, setEmail] = useState("");

	useEffect(() => {
		setEmail(emailFromServer);
	}, [setEmail, emailFromServer]);

	const onSumbit = (e) => {
		e.preventDefault();

		if (!email) {
			return;
		}

		addEmail({ content: email });
	};

	return (
		<Form onSubmit={onSumbit}>
			<div className="form-row align-items-center col-md-5">
				<InputGroup className="mb-3" style={{ width: "50vx" }}>
					<FormControl
						placeholder="Email"
						aria-label="email"
						aria-describedby="basic-addon2"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
					/>
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
		</Form>
	);
};

export default Email;
