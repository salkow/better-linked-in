import { Card } from "react-bootstrap";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CommentLike = ({ fetchData }) => {
	const [commentLikes, setCommentLikes] = useState([]);

	useEffect(() => {
		const getCommentLikes = async () => {
			const commentLikesFromServer = await fetchData("commentLikes");
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
							if (commentLike.isLike === true) {
								return (
									<Card id="like" key={index}>
										<Card.Header as="h5">
											Ο χρήστης{" "}
											<Link
												to="/discussions"
												className="name"
											>
												{commentLike.name}
											</Link>{" "}
											έδειξε ενδιαφέρον στο άρθρο με
											τίτλο: {commentLike.title}
										</Card.Header>
									</Card>
								);
							} else {
								return (
									<Card id="comment" key={index}>
										<Card.Header as="h5">
											Ο χρήστης{" "}
											<Link
												to="/discussions"
												className="name"
											>
												{commentLike.name}
											</Link>{" "}
											έκανε σχόλιο στο άρθρο με τίτλο:{" "}
											{commentLike.title}
										</Card.Header>
										<Card.Body>
											<Card.Text>
												{commentLike.content}
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
