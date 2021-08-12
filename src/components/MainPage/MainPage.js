import {
	Container,
	Image,
	Row,
	Col,
	Card,
	ListGroup,
	Accordion,
	Button,
	InputGroup,
	FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./MainPage.css";

const MainPage = () => {
	const [posts, setPosts] = useState([]);
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		const getPosts = async () => {
			const postsFromServer = await fetchPosts();
			setPosts(postsFromServer);
		};

		// getPosts();
	}, []);

	const fetchPosts = async () => {
		const res = await fetch("http://localhost:5000/posts");

		const data = await res.json();

		return data;
	};

	const likePost = () => {};
	const sendComment = () => {};

	return (
		<Container fluid>
			<Row>
				<Col xs="6" className="all_posts">
					<div className="post">
						<div className="d-grid gap-2">
							<Card style={{ margin: "10px" }}>
								<Card.Header as="h5">
									<Link to="/discussions" className="name">
										post.name
									</Link>
								</Card.Header>

								<Card.Body>
									<Card.Text className="content">
										advert.text
									</Card.Text>
								</Card.Body>
								<ListGroup variant="flush">
									<ListGroup.Item className="all_posts">
										<Image
											src="/images/Profile_10.png"
											className="media align-middle"
											rounded
										/>
									</ListGroup.Item>
									<ListGroup.Item>
										<Accordion>
											<Accordion.Item eventKey="0">
												<Accordion.Header>
													Σχόλια
												</Accordion.Header>
												<Accordion.Body>
													Lorem ipsum dolor sit amet,
													consectetur adipiscing elit,
													sed do eiusmod tempor
													incididunt ut labore et
													dolore magna aliqua. Ut enim
													ad minim veniam, quis
													nostrud
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</ListGroup.Item>

									<ListGroup.Item>
										<InputGroup>
											<Button
												style={{
													marginRight: "10px",
												}}
												onClick={(e) =>
													likePost("post.id")
												}
											>
												Μου αρέσει
											</Button>

											<FormControl
												placeholder="Γράψε ένα σχόλιο"
												as="textarea"
												rows="2"
											/>
											<Button
												onClick={(e) =>
													sendComment("post.id")
												}
											>
												Αποστολή
											</Button>
										</InputGroup>
									</ListGroup.Item>
								</ListGroup>
							</Card>

							<Card style={{ margin: "10px" }}>
								<Card.Header as="h5">
									<Link to="/discussions" className="name">
										advert.name
									</Link>
								</Card.Header>

								<Card.Body>
									<Card.Text className="content">
										advert.content
									</Card.Text>
								</Card.Body>
								<ListGroup variant="flush">
									<ListGroup.Item className="all_posts">
										<video controls className="media">
											<source
												src="/videos/Video_1.mp4"
												type="video/mp4"
											/>
											Your browser does not support the
											video tag.
										</video>
									</ListGroup.Item>
									<ListGroup.Item>
										<Accordion>
											<Accordion.Item eventKey="0">
												<Accordion.Header>
													Σχόλια
												</Accordion.Header>
												<Accordion.Body>
													Lorem ipsum dolor sit amet,
													consectetur adipiscing elit,
													sed do eiusmod tempor
													incididunt ut labore et
													dolore magna aliqua. Ut enim
													ad minim veniam, quis
													nostrud
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</ListGroup.Item>

									<ListGroup.Item>
										<InputGroup>
											<Button
												style={{
													marginRight: "10px",
												}}
											>
												Μου αρέσει
											</Button>

											<FormControl
												placeholder="Γράψε ένα σχόλιο"
												as="textarea"
												rows="2"
											/>
											<Button>Αποστολή</Button>
										</InputGroup>
									</ListGroup.Item>
								</ListGroup>
							</Card>

							<Card style={{ margin: "10px" }}>
								<Card.Header as="h5">
									<Link to="/discussions" className="name">
										advert.name
									</Link>
								</Card.Header>

								<Card.Body>
									<Card.Text className="content">
										advert.content
									</Card.Text>
								</Card.Body>
								<ListGroup variant="flush">
									<ListGroup.Item className="all_posts">
										<audio controls>
											<source
												src="/audio/Audio_1.mp3"
												type="audio/mpeg"
											/>
											Your browser does not support the
											audio element.
										</audio>
									</ListGroup.Item>
									<ListGroup.Item>
										<Accordion>
											<Accordion.Item eventKey="0">
												<Accordion.Header>
													Σχόλια
												</Accordion.Header>
												<Accordion.Body>
													Lorem ipsum dolor sit amet,
													consectetur adipiscing elit,
													sed do eiusmod tempor
													incididunt ut labore et
													dolore magna aliqua. Ut enim
													ad minim veniam, quis
													nostrud
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</ListGroup.Item>

									<ListGroup.Item>
										<InputGroup>
											<Button
												style={{
													marginRight: "10px",
												}}
											>
												Μου αρέσει
											</Button>

											<FormControl
												placeholder="Γράψε ένα σχόλιο"
												as="textarea"
												rows="2"
											/>
											<Button>Αποστολή</Button>
										</InputGroup>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default MainPage;
