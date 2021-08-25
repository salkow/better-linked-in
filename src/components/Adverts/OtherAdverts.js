import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const OtherAdverts = ({ fetchData }) => {
	const [adverts, setAdverts] = useState([]);

	useEffect(() => {
		const getAdverts = async () => {
			const advertsFromServer = await fetchData("adverts");
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
													<Card.Title>
														{advert.title}
													</Card.Title>

													<Card.Text className="content">
														{advert.content}
													</Card.Text>
												</Card.Body>
												<ListGroup variant="flush">
													<ListGroup.Item className="content">
														{abilitiesString}
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

export default OtherAdverts;
