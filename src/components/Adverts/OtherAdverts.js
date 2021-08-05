import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const OtherAdverts = () => {
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
							{adverts.map((advert, index) => (
								<Card key={index}>
									<Card.Header as="h5">
										<Link
											to="/discussions"
											className="name"
										>
											{advert.name}
										</Link>
									</Card.Header>
									<Card.Body>
										<Card.Title>{advert.title}</Card.Title>
										<Card.Text className="content">
											{advert.content}
										</Card.Text>
										<Button variant="primary">
											Κάνε αίτηση
										</Button>
									</Card.Body>
								</Card>
							))}
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default OtherAdverts;
