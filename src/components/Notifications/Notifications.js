import { Container, Row } from "react-bootstrap";

import "./Notifications.css";

import FriendRequests from "./FriendRequests";
import CommentLike from "./CommentLike";

const Notifications = () => {
	return (
		<div>
			<Container>
				<Row>
					<FriendRequests />
				</Row>
				<br />
				<Row>
					<CommentLike />
				</Row>
			</Container>
		</div>
	);
};

export default Notifications;
