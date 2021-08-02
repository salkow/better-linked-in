import {
	Form,
	Button,
	InputGroup,
	FormControl,
	FloatingLabel,
} from "react-bootstrap";

import { useState, useEffect } from "react";

const Email = ({ emailFromServer, addEmail }) => {
	const [email, setEmail] = useState("");

	useEffect(() => {
		setEmail(emailFromServer);
	}, [setEmail, emailFromServer]);

	const onSumbit = (e) => {
		e.preventDefault();

		addEmail({ content: email });
	};

	return (
		<Form onSubmit={onSumbit}>
			<div className="form-row align-items-center col-md-5">
				<InputGroup
					hasValidation
					className="mb-3"
					style={{ width: "50vx" }}
				>
					<FloatingLabel
						controlId="floatingInput"
						label="Email"
						// className="mb-3"
					>
						<FormControl
							placeholder="Email"
							aria-label="email"
							aria-describedby="basic-addon2"
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
		</Form>
	);
};

export default Email;
