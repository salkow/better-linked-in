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

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import "./Admin.css";

const Admin = ({ fetchData }) => {
	const [people, setPeople] = useState([]);
	const [peopleToExport, setPeopleToExport] = useState([]);

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
		} else {
		}
	};

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
					<Button>Εξαγωγή ως JSON</Button>
					<br />
					<br />
					<Button>Εξαγωγή ως XML</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Admin;
