import { Card, Button } from "react-bootstrap";
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
		// const res = await fetch(
		// 	"http://localhost:8081/api/vi/friendRequestsSent"
		// );

		const data = await res.json();

		return data;
	};

	const handleRequest = async (id, decision) => {
		console.log(id);
		console.log(decision);

		// He needs to delete the request from his database.

		const url = "http://localhost:8081/friendRequestResponse" + id;

		const res = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ isAccepted: decision }),
		});

		await res.json();

		// Remove friend request from visible requests.
		setFriendRequests(
			friendRequests.filter((request) => request.id !== id)
		);
	};

	return (
		<div>
			{friendRequests.length === 0 ? (
				<h2>Δεν υπάρχουν αιτήματα σύνδεσης</h2>
			) : (
				<div>
					<h2>Αιτήματα σύνδεσης</h2>

					<div className="requests-box">
						{friendRequests.map((request, index) => (
							<Card key={index} id="request">
								<Card.Body>
									<Card.Title>
										<Link
											to="/discussions"
											className="name"
										>
											{request.name}
										</Link>
									</Card.Title>
									<Button
										variant="success"
										style={{ margin: "10px" }}
										onClick={(e) =>
											handleRequest(request.id, true)
										}
									>
										Αποδοχή
									</Button>
									<Button
										variant="danger"
										onClick={(e) =>
											handleRequest(request.id, false)
										}
									>
										Απόρριψη
									</Button>
								</Card.Body>
							</Card>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default FriendRequests;
