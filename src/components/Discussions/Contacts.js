import { ButtonGroup, Button } from "react-bootstrap";

const Contacts = ({ contacts, focusContact }) => {
	return (
		<div className="contact-box">
			<div className="d-grid gap-2">
				{contacts.map((contact) => (
					<ButtonGroup key={contact.id.toString()}>
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
