import { ButtonGroup, Button } from "react-bootstrap";

const Contacts = ({ contacts, focusContact, navHeight, pageHeight }) => {
	return (
		<div
			className="contact-box"
			style={{ maxHeight: `${pageHeight - navHeight - 40}px` }}
		>
			<div className="d-grid gap-2">
				{contacts.map((contact, index) => (
					<ButtonGroup key={index}>
						<Button
							variant="info"
							onClick={(e) =>
								focusContact(contact.id, contact.name)
							}
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
