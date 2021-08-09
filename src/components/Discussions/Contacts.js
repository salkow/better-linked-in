import { ButtonGroup, Button } from "react-bootstrap";

const Contacts = ({ contacts, focusContact, navHeight, pageHeight }) => {
	const test = () => {
		console.log(navHeight);
		console.log(pageHeight);
		console.log(pageHeight - navHeight - 698);
	};

	return (
		<div
			className="contact-box"
			style={{ maxHeight: `${pageHeight - navHeight - 40}px` }}
		>
			<div className="d-grid gap-2">
				{contacts.map((contact) => (
					<ButtonGroup key={contact.id.toString()}>
						<Button
							variant="info"
							// onClick={(e) =>
							// 	focusContact(contact.id, contact.name)
							// }
							onClick={test}
						>
							{contact.name}
						</Button>
					</ButtonGroup>
				))}
			</div>
		</div>
	);
};

export default Contacts;
