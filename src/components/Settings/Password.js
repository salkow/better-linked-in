import {
	Form,
	Button,
	InputGroup,
	FormControl,
	FloatingLabel,
} from "react-bootstrap";

import { useState } from "react";

const Password = ({ sendData }) => {
	const [password, setPassword] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		sendData({ content: password }, "password", "POST");
		setPassword("");
	};

	return (
		<Form onSubmit={onSubmit}>
			<div className="form-row align-items-center col-md-5">
				<InputGroup
					className="mb-3"
					hasValidation
					style={{ width: "50vx" }}
				>
					<FloatingLabel controlId="floatingInput" label="Password">
						<FormControl
							placeholder="Password"
							aria-label="password"
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							required
							htmlSize="31"
							value={password}
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

export default Password;
