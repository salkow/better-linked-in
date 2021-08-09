import { Container, Row, Form, FormControl, Button } from "react-bootstrap";

import { useState } from "react";

const NewAdvert = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		const id = Math.floor(Math.random() * 10000) + 1;

		addAdvert({ id, name: "Name", title, content: description });

		setTitle("");
		setDescription("");
	};

	const addAdvert = async (newAdvert) => {
		const res = await fetch("http://localhost:5000/adverts", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newAdvert),
		});

		await res.json();
	};

	return (
		<Container fluid>
			<Row>
				<Form onSubmit={onSubmit}>
					<FormControl
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Τίτλος"
						required
						value={title}
					/>

					<br />

					<FormControl
						as="textarea"
						className="textarea"
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Περιγραφή"
						required
						value={description}
					/>

					<br />

					<Button type="submit" variable="primary" size="lg">
						Submit
					</Button>
				</Form>
			</Row>
		</Container>
	);
};

export default NewAdvert;
