import { Card } from "react-bootstrap";
import { useEffect, useRef } from "react";

const Messages = ({
	messages,
	myName,
	myId,
	friendName,
	navHeight,
	pageHeight,
}) => {
	const lastMessage = useRef(null);

	const scrollToLastMessage = () => lastMessage.current.scrollIntoView();

	// Scroll to the last message when the page loads.
	useEffect(() => {
		scrollToLastMessage();

		// console.log("myName: " + myName);
		// console.log("myId: " + myId);
		// console.log("friendName: " + friendName);
	});

	return (
		<div
			className="message-box"
			style={{ maxHeight: `${pageHeight - navHeight - 162}px` }}
		>
			<div className="d-grid gap-2">
				{messages.map((message, index) => (
					<Card key={index}>
						<Card.Body
							className={
								message.ownerId === myId
									? "sender-message"
									: "recipient-message"
							}
						>
							<Card.Title>
								{message.ownerId === myId ? myName : friendName}
							</Card.Title>
							<Card.Text className="message">
								{message.text}
							</Card.Text>
						</Card.Body>
					</Card>
				))}
				<div ref={lastMessage} />
			</div>
		</div>
	);
};

export default Messages;
