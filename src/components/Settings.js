import {
	Container,
	Row,
	Button,
	InputGroup,
	FormControl,
} from "react-bootstrap";

const Settings = () => {
	return (
		<Container>
			<Row>
				<h2 className="align-middle">Άλλαξε τα στοιχεία σου.</h2>
			</Row>
			<Row>
				<form>
					<div className="form-row align-items-center col-md-5">
						<InputGroup className="mb-3" style={{ width: "50vx" }}>
							<FormControl
								placeholder="Email"
								aria-label="email"
								aria-describedby="basic-addon2"
							/>
							<Button
								size="sm"
								as="input"
								type="sumbit"
								value="Submit"
								style={{ padding: "1px" }}
								readOnly
							/>
						</InputGroup>
					</div>
				</form>
			</Row>
			<Row>
				<form>
					<div className="form-row align-items-center col-md-5">
						<InputGroup className="mb-3">
							<FormControl
								placeholder="Password"
								aria-label="password"
								aria-describedby="basic-addon2"
								type="password"
							/>
							<Button
								size="sm"
								as="input"
								type="sumbit"
								value="Submit"
								style={{ padding: "1px" }}
								readOnly
							/>
						</InputGroup>
					</div>
				</form>
			</Row>
		</Container>
	);
};

export default Settings;
