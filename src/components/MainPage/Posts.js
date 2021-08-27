import {
	Col,
	Card,
	Image,
	FormControl,
	ListGroup,
	Accordion,
	InputGroup,
	Button,
	Form,
} from "react-bootstrap";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Posts = ({ posts, setPosts, fetchData }) => {
	useEffect(() => {
		const getSenderName = async () => {
			const dataFromServer = await fetchData("sign_up");
			const userName =
				dataFromServer.firstName + " " + dataFromServer.lastName;
			setSenderName(userName);
		};

		getSenderName();
	});

	const [newComment, setNewComment] = useState("");

	const [senderName, setSenderName] = useState("");

	const likePost = (postId) => {};
	const sendComment = (postId) => {
		if (newComment.length === 0) {
			return;
		}

		const newPosts = [...posts];

		newPosts.forEach(function (post) {
			if (post.id === postId) {
				post.comments.push({
					id: 3,
					name: senderName,
					text: newComment,
				});

				return;
			}
		});

		setNewComment("");

		setPosts(newPosts);
	};

	return (
		<Col xs="6" className="all_posts">
			<div className="post">
				<div className="d-grid gap-2">
					{posts.length === 0 ? (
						<h2>Δεν υπάρχουν δημοσίευσεις</h2>
					) : (
						<div>
							{posts.map((post, index) => {
								return (
									<Card
										style={{ margin: "10px" }}
										key={index}
									>
										<Card.Header as="h5">
											<Link
												to="/discussions"
												className="name"
											>
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
												{post.type_of_media ===
													"image" && (
													<Image
														src={post.media}
														className="media align-middle"
														rounded
													/>
												)}

												{post.type_of_media ===
													"video" && (
													<video
														controls
														className="media"
													>
														<source
															src={post.media}
															type="video/mp4"
														/>
														Your browser does not
														support the video tag.
													</video>
												)}

												{post.type_of_media ===
													"audio" && (
													<audio controls>
														<source
															src={post.media}
															type="audio/mpeg"
														/>
														Your browser does not
														support the audio
														element.
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
												<Form>
													<InputGroup>
														<Button
															style={{
																marginRight:
																	"10px",
															}}
															onClick={(e) =>
																likePost(
																	post.id
																)
															}
														>
															Μου αρέσει
														</Button>

														<FormControl
															placeholder="Γράψε ένα σχόλιο"
															as="textarea"
															rows="2"
															onChange={(e) =>
																setNewComment(
																	e.target
																		.value
																)
															}
														/>
														<Button
															onClick={(e) =>
																sendComment(
																	post.id
																)
															}
															type="reset"
														>
															Αποστολή
														</Button>
													</InputGroup>
												</Form>
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
	);
};

export default Posts;
