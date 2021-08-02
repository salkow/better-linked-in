import { Container, Form, FormControl, Button } from "react-bootstrap";

import { useState, useEffect } from "react";

import "./TextArea.css";

const TextArea = ({ textFromServer, visibleFromServer, addText }) => {
	const [text, setText] = useState("");
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setText(textFromServer);
		setVisible(visibleFromServer);
	}, [textFromServer, visibleFromServer, setText, setVisible]);

	const onSubmit = (e) => {
		e.preventDefault();

		addText({ content: text, visible: visible });
	};

	return (
		<Container>
			<Form onSubmit={onSubmit}>
				<FormControl
					as="textarea"
					aria-label="With textarea"
					className="textArea"
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
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
			</Form>
		</Container>
	);
};

export default TextArea;
