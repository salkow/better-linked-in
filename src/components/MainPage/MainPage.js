import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

import Posts from "./Posts";
import NewPost from "./NewPost";

import "./MainPage.css";

const MainPage = ({ fetchData, sendData }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			const postsFromServer = await fetchData("posts");
			setPosts(postsFromServer);
		};

		getPosts();
	}, [fetchData]);

	return (
		<Container fluid>
			<Row>
				<NewPost setPosts={setPosts} sendData={sendData} />
			</Row>
			<Row>
				<Posts
					posts={posts}
					setPosts={setPosts}
					fetchData={fetchData}
				/>
			</Row>
		</Container>
	);
};

export default MainPage;
