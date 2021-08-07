import { Card } from "react-bootstrap";

import { useState, useEffect } from "react";

const CommentLike = () => {
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState([]);

	useEffect(() => {
		const getComments = async () => {
			const commentsFromServer = await fetchData("comments");
			setComments(commentsFromServer);
		};

		const getLikes = async () => {
			const likesFromServer = await fetchData("likes");
			setLikes(likesFromServer);
		};

		getComments();
		getLikes();
	}, []);

	const fetchData = async (topic) => {
		const res = await fetch(`http://localhost:5000/${topic}`);

		const data = await res.json();

		return data;
	};

	return (
		<div className="comment-like-box">
			<div className="d-grid gap-2">
				<h2>Σημειώσεις ενδιαφέροντος \ Σχόλια</h2>
				<Card className="comment">
					<Card.Header as="h5">
						Ο χρήστης Χρήστος Καφρίτσας έκανε σχόλιο στο άρθρο με
						τίτλο: title
					</Card.Header>
					<Card.Body>
						<Card.Text>Sample text</Card.Text>
					</Card.Body>
				</Card>

				<br />

				<Card className="like">
					<Card.Header as="h5">
						Ο χρήστης Χρήστος Καφρίτσας έδειξε ενδιαφέρον στο άρθρο
						με τίτλο: title
					</Card.Header>
				</Card>
			</div>
		</div>
	);
};

export default CommentLike;
