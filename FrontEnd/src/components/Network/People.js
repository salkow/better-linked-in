import { Link } from "react-router-dom";
import { Card, ListGroup, Row } from "react-bootstrap";

import { useState, useEffect } from "react";

const People = ({ fetchData }) => {
	const [people, setPeople] = useState([]);

	useEffect(() => {
		const getPeople = async () => {
			const peopleFromServer = await fetchData("friends");
			setPeople(peopleFromServer);
		};

		getPeople();
	}, [fetchData]);

	return (
		<div>
			{people.length === 0 ? (
				<h2>Δεν υπάρχουν εππαγελματίες</h2>
			) : (
				<Row>
					{people.map((person, index) => (
						<Card style={{ width: "18rem" }} key={index}>
							<Link
								to={"/personal?id=" + person.id}
								className="name"
							>
								<Card.Img
									variant="top"
									src={
										"https://localhost:8043/" +
										person.picture
									}
									className="aimg"
								/>
								<Card.Header as="h4">
									{person.firstName + " " + person.lastName}
								</Card.Header>
							</Link>
							<ListGroup variant="flush">
								<ListGroup.Item>{person.job}</ListGroup.Item>
								<ListGroup.Item>
									{person.company}
								</ListGroup.Item>
							</ListGroup>
						</Card>
					))}
				</Row>
			)}
		</div>
	);
};

export default People;
