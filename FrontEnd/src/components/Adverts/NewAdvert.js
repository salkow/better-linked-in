import { Container, Row, Form, FormControl, Button } from "react-bootstrap";

import { useState } from "react";

const NewAdvert = ({ navHeight, pageHeight, sendData }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [abilities, setAbilities] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		sendData(
			{
				title,
				text: description,
				skills: abilities,
			},
			"advert",
			"POST"
		);

		setTitle("");
		setDescription("");
		setAbilities("");
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
						style={{
							height: `${(pageHeight - navHeight) / 2 - 180}px`,
						}}
					/>

					<br />

					<FormControl
						as="textarea"
						className="textarea"
						onChange={(e) => setAbilities(e.target.value)}
						placeholder="Απαιτούμενες ικανότητες. (Άφησε μια κενή γραμμή ανά δεξιότητα)"
						required
						value={abilities}
						style={{
							height: `${(pageHeight - navHeight) / 2 - 100}px`,
						}}
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
