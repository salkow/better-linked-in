import {
	Form,
	Button,
	InputGroup,
	FormControl,
	FloatingLabel,
} from "react-bootstrap";

import { useState } from "react";

const Password = ({ addPassword }) => {
	const [password, setPassword] = useState("");

	const onSumbit = (e) => {
		e.preventDefault();

		addPassword({ content: password });
	};

	return (
		<Form onSubmit={onSumbit}>
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
							aria-describedby="basic-addon2"
							onChange={(e) => setPassword(e.target.value)}
							type="password"
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

export default Password;
