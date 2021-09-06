import { Card } from "react-bootstrap";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CommentLike = ({ fetchData }) => {
	const [commentLikes, setCommentLikes] = useState([]);

	useEffect(() => {
		const getCommentLikes = async () => {
			const commentLikesFromServer = await fetchData("notifications");
			setCommentLikes(commentLikesFromServer);
		};

		getCommentLikes();
	}, [fetchData]);

	return (
		<div>
			{commentLikes.length === 0 ? (
				<h2>Δεν υπάρχουν σημειώσεις ενδιαφέροντος / σχόλια</h2>
			) : (
				<div className="comment-like-box">
					<div className="d-grid gap-2">
						<h2>Σημειώσεις ενδιαφέροντος / Σχόλια</h2>
						{commentLikes.map((commentLike, index) => {
							if (commentLike.like !== null) {
								return (
									<Card id="like" key={index}>
										<Card.Header as="h5">
											Ο χρήστης{" "}
											<Link
												to={
													"/personal?id=" +
													commentLike.like.owner
												}
												className="name"
											>
												{commentLike.like.owner_name}
											</Link>{" "}
											έδειξε ενδιαφέρον στο άρθρο σας
										</Card.Header>
									</Card>
								);
							} else {
								return (
									<Card id="comment" key={index}>
										<Card.Header as="h5">
											Ο χρήστης{" "}
											<Link
												to={
													"/personal?id=" +
													commentLike.comment.owner
												}
												className="name"
											>
												{commentLike.comment.ownerName}
											</Link>{" "}
											έκανε σχόλιο στο άρθρο σας
										</Card.Header>
										<Card.Body>
											<Card.Text>
												{commentLike.comment.text}
											</Card.Text>
										</Card.Body>
									</Card>
								);
							}
						})}
						<br />
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentLike;
