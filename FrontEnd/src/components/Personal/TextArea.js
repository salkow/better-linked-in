import { Container, Row, Form, FormControl, Button } from "react-bootstrap";

import { useState, useEffect } from "react";

import "./TextArea.css";

const TextArea = ({
	textFromServer,
	visibleFromServer,
	addText,
	navHeight,
	pageHeight,
	placeholderText,
	isMyProfile,
}) => {
	const [text, setText] = useState("");
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setText(textFromServer);
		setVisible(visibleFromServer);
	}, [textFromServer, visibleFromServer]);

	const onSubmit = (e) => {
		e.preventDefault();

		addText({ text, displayable: visible });
	};

	return (
		<Container>
			<Row>
				<Form onSubmit={onSubmit}>
					{isMyProfile ? (
						<div>
							<FormControl
								as="textarea"
								className="textArea"
								value={text}
								onChange={(e) => setText(e.target.value)}
								required
								placeholder={placeholderText}
								style={{
									height: `${pageHeight - navHeight - 180}px`,
								}}
							/>

							<Form.Check
								type="switch"
								label="Εμφάνιση σε όλους."
								onChange={(e) => setVisible(e.target.checked)}
								checked={visible}
							/>

							<Button type="submit" variable="primary" size="lg">
								Submit
							</Button>
						</div>
					) : (
						<FormControl
							as="textarea"
							className="textArea"
							value={text}
							style={{
								height: `${pageHeight - navHeight - 180}px`,
							}}
							readOnly
						/>
					)}
				</Form>
			</Row>
		</Container>
	);
};

export default TextArea;
