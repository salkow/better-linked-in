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

const Admin = () => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [job, setJob] = useState("");
	const [employmentInstitution, setEmploymentInstitution] = useState("");

	function CustomToggle({ children, eventKey }) {
		const selectUser = useAccordionButton(eventKey);

		return <Button onClick={selectUser}>{children}</Button>;
	}

	useEffect(() => {
		// You will need an array of all the information about the users.
		//
	}, []);
	return (
		<Container fluid>
			<Row>
				<Col xs="6" className="users">
					<Accordion>
						<Card>
							<Card.Header>
								<Container>
									<Row>
										<Form.Check
											type="checkbox"
											label="Επιλογή"
											// onChange={(e) =>
											// setVisible(e.target.checked)
											// }
										/>
										{/* You have to make the event key the id of the user. */}
										<CustomToggle eventKey="0">
											Name Surname
										</CustomToggle>
									</Row>
								</Container>
							</Card.Header>
							<Accordion.Collapse eventKey="0">
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
															src="/images/Profile_10.png"
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
																{name}
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
																{surname}
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
																{email}
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
																{phone}
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
															Εππαγελματική θέση
														</Form.Label>

														<Col sm="10">
															<Form.Label
																column
																sm="2"
															>
																{job}
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
															Φορέας Απασχόλησης
														</Form.Label>

														<Col sm="10">
															<Form.Label
																column
																sm="2"
															>
																{
																	employmentInstitution
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
					</Accordion>
				</Col>
			</Row>
		</Container>
	);
};

export default Admin;
