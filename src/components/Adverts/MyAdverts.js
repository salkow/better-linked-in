import {
	Container,
	Row,
	Col,
	Card,
	Dropdown,
	ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const MyAdverts = ({ fetchData }) => {
	const [adverts, setAdverts] = useState([]);

	useEffect(() => {
		const getAdverts = async () => {
			const advertsFromServer = await fetchData("my_adverts");
			setAdverts(advertsFromServer);
		};

		getAdverts();
	}, [fetchData]);

	return (
		<Container fluid>
			<Row>
				<Col xs="7" className="all_adverts">
					<div className="advert">
						<div className="d-grid gap-2">
							{adverts.length === 0 ? (
								<h1>Δεν έχεις δημιουργήσει ακόμα αγγελίες.</h1>
							) : (
								<div>
									{adverts.map((advert, index) => {
										const abilitiesArr =
											advert.abilities.join("\n\n");

										return (
											<Card
												key={index}
												style={{ margin: "10px" }}
											>
												<Card.Body>
													<Card.Title>
														{advert.title}
													</Card.Title>
													<Card.Text className="content">
														{advert.content}
													</Card.Text>
												</Card.Body>

												<ListGroup variant="flush">
													<ListGroup.Item className="content">
														{abilitiesArr}
													</ListGroup.Item>
													<ListGroup.Item>
														<Dropdown>
															<Dropdown.Toggle variant="success">
																Αιτήσεις
															</Dropdown.Toggle>

															<Dropdown.Menu>
																{advert.applications.map(
																	(
																		applicant,
																		my_index
																	) => (
																		<Dropdown.Item
																			as="button"
																			key={
																				my_index
																			}
																		>
																			<Link
																				to="/discussions"
																				className="name"
																			>
																				{
																					applicant.name
																				}
																			</Link>
																		</Dropdown.Item>
																	)
																)}
															</Dropdown.Menu>
														</Dropdown>
													</ListGroup.Item>
												</ListGroup>
											</Card>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default MyAdverts;
