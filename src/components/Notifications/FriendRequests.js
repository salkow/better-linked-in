import { Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const FriendRequests = () => {
	const [friendRequests, setFriendRequests] = useState([]);

	useEffect(() => {
		const getFriendRequests = async () => {
			const friendRequestsFromServer = await fetchFriendRequests();
			setFriendRequests(friendRequestsFromServer);
		};

		getFriendRequests();
	}, []);

	const fetchFriendRequests = async () => {
		const res = await fetch("http://localhost:5000/friend_requests");

		const data = await res.json();

		return data;
	};

	return (
		<div>
			<h2>Αιτήματα σύνδεσης</h2>

			<div className="requests-box">
				<Row sm={2} md={3} lg={4} className="gap-2 request">
					{friendRequests.map((request, index) => (
						<Card key={index}>
							<Card.Body>
								<Card.Title>
									<Link to="/discussions" className="name">
										{request.name}
									</Link>
								</Card.Title>
								<Button
									variant="success"
									style={{ margin: "10px" }}
								>
									Αποδοχή
								</Button>
								<Button variant="danger">Απόρριψη</Button>
							</Card.Body>
						</Card>
					))}
				</Row>
			</div>
		</div>
	);
};

export default FriendRequests;
