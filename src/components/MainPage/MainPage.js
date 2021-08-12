import {
	Container,
	Image,
	Row,
	Col,
	Card,
	ListGroup,
	Accordion,
	Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./MainPage.css";

const MainPage = () => {
	const [adverts, setAdverts] = useState([]);

	useEffect(() => {
		const getAdverts = async () => {
			const advertsFromServer = await fetchAdverts();
			setAdverts(advertsFromServer);
		};

		getAdverts();
	}, []);

	const fetchAdverts = async () => {
		const res = await fetch("http://localhost:5000/adverts");

		const data = await res.json();

		return data;
	};

	return (
		<Container fluid>
			<Row>
				<Col xs="7" className="all_adverts">
					<div className="advert">
						<div className="d-grid gap-2">
							{adverts.length === 0 ? (
								<h1>Δεν υπάρχουν αγγελίες</h1>
							) : (
								<div>
									{adverts.map((advert, index) => {
										const abilitiesString =
											advert.abilities.join("\n\n");

										return (
											<Card
												key={index}
												style={{ margin: "10px" }}
											>
												<Card.Header as="h5">
													<Link
														to="/discussions"
														className="name"
													>
														{advert.name}
													</Link>
												</Card.Header>

												<Card.Body>
													<Card.Text className="content">
														{advert.content}
													</Card.Text>
												</Card.Body>
												<ListGroup variant="flush">
													<ListGroup.Item>
														<Image
															src="/images/Profile_10.png"
															className="media"
															rounded
														/>
													</ListGroup.Item>
													<Button></Button>
													<ListGroup.Item>
														<Accordion>
															<Accordion.Item eventKey="0">
																<Accordion.Header>
																	Σχόλια
																</Accordion.Header>
																<Accordion.Body>
																	Lorem ipsum
																	dolor sit
																	amet,
																	consectetur
																	adipiscing
																	elit, sed do
																	eiusmod
																	tempor
																	incididunt
																	ut labore et
																	dolore magna
																	aliqua. Ut
																	enim ad
																	minim
																	veniam, quis
																	nostrud
																	exercitation
																	ullamco
																	laboris nisi
																	ut aliquip
																	ex ea
																	commodo
																	consequat.
																	Duis aute
																	irure dolor
																	in
																	reprehenderit
																	in voluptate
																	velit esse
																	cillum
																	dolore eu
																	fugiat nulla
																	pariatur.
																	Excepteur
																	sint
																	occaecat
																	cupidatat
																	non
																	proident,
																	sunt in
																	culpa qui
																	officia
																	deserunt
																	mollit anim
																	id est
																	laborum.
																</Accordion.Body>
															</Accordion.Item>
														</Accordion>
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

export default MainPage;
