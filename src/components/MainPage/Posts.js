import {
	Col,
	Card,
	Image,
	FormControl,
	ListGroup,
	Accordion,
	InputGroup,
	Button,
} from "react-bootstrap";

import { useState } from "react";

import { Link } from "react-router-dom";

const Posts = ({ posts, setPosts }) => {
	const likePost = (postId) => {};
	const sendComment = (postId) => {
		// posts.forEach(function (post) {
		// if (post.id == postId) {
		// 	const changedPost = post;
		// 	const name = getSenderName();
		// 	changedPost.comments.push({ id: 3, name, newComment });
		// 	console.log(post);
		// }
		// });
	};

	const getSenderName = async () => {
		// const dataFromServer = await fetchData("sign_up");
		// const userName =
		// 	dataFromServer.firstName + " " + dataFromServer.lastName;
		// setSenderName(userName);
	};

	const [newComment, setNewComment] = useState("");

	return (
		<Col xs="6" className="all_posts">
			<div className="post">
				<div className="d-grid gap-2">
					{posts.map((post, index) => {
						return (
							<Card style={{ margin: "10px" }} key={index}>
								<Card.Header as="h5">
									<Link to="/discussions" className="name">
										{post.name}
									</Link>
								</Card.Header>
								{post.text !== "" && (
									<Card.Body>
										<Card.Text className="content">
											{post.text}
										</Card.Text>
									</Card.Body>
								)}
								<ListGroup variant="flush">
									<ListGroup.Item className="all_posts">
										{post.type_of_media === "image" && (
											<Image
												src={post.media}
												className="media align-middle"
												rounded
											/>
										)}

										{post.type_of_media === "video" && (
											<video controls className="media">
												<source
													src={post.media}
													type="video/mp4"
												/>
												Your browser does not support
												the video tag.
											</video>
										)}

										{post.type_of_media === "audio" && (
											<audio controls>
												<source
													src={post.media}
													type="audio/mpeg"
												/>
												Your browser does not support
												the audio element.
											</audio>
										)}
									</ListGroup.Item>
									{post.comments.length !== 0 && (
										<ListGroup.Item>
											<Accordion>
												<Accordion.Item eventKey="0">
													<Accordion.Header>
														Σχόλια
													</Accordion.Header>
													<Accordion.Body>
														{post.comments.map(
															(
																comment,
																other_index
															) => (
																<Card
																	key={
																		other_index
																	}
																>
																	<Card.Header as="h5">
																		{
																			comment.name
																		}
																	</Card.Header>
																	<Card.Body>
																		<Card.Text>
																			{
																				comment.text
																			}
																		</Card.Text>
																	</Card.Body>
																</Card>
															)
														)}
													</Accordion.Body>
												</Accordion.Item>
											</Accordion>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<InputGroup>
											<Button
												style={{
													marginRight: "10px",
												}}
												onClick={(e) =>
													likePost(post.id)
												}
											>
												Μου αρέσει
											</Button>

											<FormControl
												placeholder="Γράψε ένα σχόλιο"
												as="textarea"
												rows="2"
												value={newComment}
												onChange={(e) =>
													setNewComment(
														e.target.value
													)
												}
											/>
											<Button
												onClick={(e) =>
													sendComment(post.id)
												}
											>
												Αποστολή
											</Button>
										</InputGroup>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						);
					})}
				</div>
			</div>
		</Col>
	);
};

export default Posts;
