import {
	ListGroup,
	Container,
	Row,
	Col,
	Card,
	Accordion,
	Form,
	Button,
	useAccordionButton,
} from "react-bootstrap";

import { useState, useEffect } from "react";

import "./Admin.css";

const Admin = ({ fetchData }) => {
	const [people, setPeople] = useState([]);
	const [peopleToExport, setPeopleToExport] = useState([]);

	const [show, setShow] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const handleModalClose = () => setShow(false);
	const handleModalShow = (message) => {
		setModalMessage(message);
		setShow(true);
	};

	function CustomToggle({ children, eventKey }) {
		const selectUser = useAccordionButton(eventKey);

		return <Button onClick={selectUser}>{children}</Button>;
	}

	useEffect(() => {
		const getPeople = async () => {
			const peopleFromServer = await fetchData("people");
			setPeople(peopleFromServer);
		};

		getPeople();

		// You will need an array of all the information about the users.
	}, [fetchData]);

	const setExportStatus = (checked, id) => {
		if (checked) {
			setPeople([...peopleToExport, id]);
		} else {
			setPeopleToExport(
				peopleToExport.filter((person) => person.id !== id)
			);
		}
	};

	const exportJSON = () => {};

	const exportXML = () => {};

	return (
		<Container fluid>
			<Row>
				<Col xs="6" className="middle">
					<Accordion>
						{people.map((person, index) => (
							<Card key={index}>
								<Card.Header>
									<Container>
										<Row>
											<Form.Check
												type="checkbox"
												label="Επιλογή"
												onChange={(e) =>
													setExportStatus(
														e.target.checked,
														person.id
													)
												}
											/>
											<CustomToggle eventKey={person.id}>
												{person.name}
											</CustomToggle>
										</Row>
									</Container>
								</Card.Header>
								<Accordion.Collapse eventKey={person.id}>
									<Card.Body>
										<Container fluid>
											<Form className="user-data">
												<ListGroup variant="flush">
													<ListGroup.Item>
														<Card
															style={{
																width: "18rem",
															}}
														>
															<Card.Img
																variant="top"
																src={
																	person.picture
																}
															/>
														</Card>
													</ListGroup.Item>

													<ListGroup.Item>
														<Form.Group
															as={Row}
															className="mb-3"
														>
															<Form.Label
																column
																sm="2"
															>
																Όνομα
															</Form.Label>

															<Col sm="10">
																<Form.Label
																	column
																	sm="2"
																>
																	{
																		person.name
																	}
																</Form.Label>
															</Col>
														</Form.Group>
													</ListGroup.Item>

													<ListGroup.Item>
														<Form.Group
															as={Row}
															className="mb-3"
														>
															<Form.Label
																column
																sm="2"
															>
																Επίθετο
															</Form.Label>

															<Col sm="10">
																<Form.Label
																	column
																	sm="2"
																>
																	{/* {
																		person.surname
																	} */}
																	Surname
																</Form.Label>
															</Col>
														</Form.Group>
													</ListGroup.Item>

													<ListGroup.Item>
														<Form.Group
															as={Row}
															className="mb-3"
														>
															<Form.Label
																column
																sm="2"
															>
																Email
															</Form.Label>

															<Col sm="10">
																<Form.Label
																	column
																	sm="2"
																>
																	{/* {
																		person.email
																	} */}
																	person.email.com
																</Form.Label>
															</Col>
														</Form.Group>
													</ListGroup.Item>

													<ListGroup.Item>
														<Form.Group
															as={Row}
															className="mb-3"
														>
															<Form.Label
																column
																sm="2"
															>
																Τηλέφωνο
															</Form.Label>

															<Col sm="10">
																<Form.Label
																	column
																	sm="2"
																>
																	{/* person.email */}
																	6912345678
																</Form.Label>
															</Col>
														</Form.Group>
													</ListGroup.Item>

													<ListGroup.Item>
														<Form.Group
															as={Row}
															className="mb-3"
														>
															<Form.Label
																column
																sm="2"
															>
																Εππαγελματική
																θέση
															</Form.Label>

															<Col sm="10">
																<Form.Label
																	column
																	sm="2"
																>
																	{person.job}
																</Form.Label>
															</Col>
														</Form.Group>
													</ListGroup.Item>

													<ListGroup.Item>
														<Form.Group
															as={Row}
															className="mb-3"
														>
															<Form.Label
																column
																sm="2"
															>
																Φορέας
																Απασχόλησης
															</Form.Label>

															<Col sm="10">
																<Form.Label
																	column
																	sm="2"
																>
																	{
																		person.employmentInstitution
																	}
																</Form.Label>
															</Col>
														</Form.Group>
													</ListGroup.Item>
												</ListGroup>
											</Form>
										</Container>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						))}
					</Accordion>
				</Col>
			</Row>
			<Row>
				<Col xs="6" className="middle export-button footer middle">
					<Button onClick={exportJSON}>Εξαγωγή ως JSON</Button>
					<br />
					<br />
					<Button onClick={exportXML}>Εξαγωγή ως XML</Button>
				</Col>
			</Row>

			<Modal show={show} onHide={handleModalClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Κάτι πήγε στραβά.</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalMessage}</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleModalClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Admin;
