import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

import Posts from "./Posts";
import NewPost from "./NewPost";

import "./MainPage.css";

const MainPage = ({ fetchData, sendData, sendFormData }) => {
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
				<NewPost setPosts={setPosts} sendFormData={sendFormData} />
			</Row>
			<Row>
				<Posts
					posts={posts}
					setPosts={setPosts}
					fetchData={fetchData}
					sendData={sendData}
				/>
			</Row>
		</Container>
	);
};

export default MainPage;
