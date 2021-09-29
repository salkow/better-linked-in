import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useInterval from "../Util/Delay";

const FriendRequests = ({ fetchData, sendData }) => {
	const [friendRequests, setFriendRequests] = useState([]);

	const getFriendRequests = async () => {
		const friendRequestsFromServer = await fetchData(
			"friendRequestsReceived"
		);
		setFriendRequests(friendRequestsFromServer);
	};

	useEffect(() => {
		fetchData("friendRequestsReceived").then((friendRequestsFromServer) =>
			setFriendRequests(friendRequestsFromServer)
		);
	}, [fetchData]);

	useInterval(() => {
		getFriendRequests();
	}, 10000);

	const handleRequest = async (id, decision) => {
		sendData({ response: decision }, "friendRequestResponse/" + id, "PUT");

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
											to={"/personal?id=" + request.id}
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
