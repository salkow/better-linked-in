import { Container, Row } from "react-bootstrap";

import "./Notifications.css";

import FriendRequests from "./FriendRequests";
import CommentLike from "./CommentLike";

const Notifications = ({ fetchData, sendData }) => {
	return (
		<div>
			<Container>
				<Row>
					<FriendRequests fetchData={fetchData} sendData={sendData} />
				</Row>
				<br />
				<Row>
					<CommentLike fetchData={fetchData} />
				</Row>
			</Container>
		</div>
	);
};

export default Notifications;
