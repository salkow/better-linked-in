import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

import Posts from "./Posts";

import "./MainPage.css";

const MainPage = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			const postsFromServer = await fetchPosts();
			setPosts(postsFromServer);
		};

		getPosts();
	}, []);

	const fetchPosts = async () => {
		const res = await fetch("http://localhost:5000/posts");

		const data = await res.json();

		return data;
	};

	return (
		<Container fluid>
			<Row>
				<Posts posts={posts} setPosts={setPosts} />
			</Row>
		</Container>
	);
};

export default MainPage;
