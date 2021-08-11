import { Card } from "react-bootstrap";
import { useEffect, useRef } from "react";

const Messages = ({
	messages,
	senderName,
	recipientName,
	navHeight,
	pageHeight,
}) => {
	const lastMessage = useRef(null);

	const scrollToLastMessage = () => lastMessage.current.scrollIntoView();

	// Scroll to the last message when the page loads.
	useEffect(() => {
		scrollToLastMessage();
	}, []);

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
								message.from_sender === true
									? "sender-message"
									: "recipient-message"
							}
						>
							<Card.Title>
								{message.from_sender === true
									? senderName
									: recipientName}
							</Card.Title>
							<Card.Text className="message">
								{message.content}
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
