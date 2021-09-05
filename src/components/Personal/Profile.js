import {
	Form,
	Button,
	Container,
	Row,
	Col,
	ListGroup,
	Card,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";

import "./Profile.css";

const Profile = ({
	isMyProfile,
	isFriendsProfile,
	sendData,
	id,
	name,
	surname,
	email,
	phone,
	job,
	employmentInstitution,
	photoPath,
}) => {
	const addFriend = () => {
		// TODO: Ask him to ignore more than one friend requests to the same user.
		sendData("", "friendRequest/" + id, "PUT");
	};

	const history = useHistory();

	return (
		<Container>
			<Form>
				<ListGroup variant="flush">
					<ListGroup.Item>
						<Card style={{ width: "18rem" }}>
							<Card.Img variant="top" src={photoPath} />
							{isMyProfile === false && (
								<Card.Body>
									{isFriendsProfile ? (
										<Link to={"/discussions?id=" + id}>
											<Button>Μήνυμα</Button>
										</Link>
									) : (
										<Button
											variant="success"
											onClick={addFriend}
										>
											Συνδέσου
										</Button>
									)}
								</Card.Body>
							)}
						</Card>
					</ListGroup.Item>

					<ListGroup.Item>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="2">
								Όνομα
							</Form.Label>

							<Col sm="10">
								<Form.Label column sm="2">
									{name}
								</Form.Label>
							</Col>
						</Form.Group>
					</ListGroup.Item>

					<ListGroup.Item>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="2">
								Επίθετο
							</Form.Label>

							<Col sm="10">
								<Form.Label column sm="2">
									{surname}
								</Form.Label>
							</Col>
						</Form.Group>
					</ListGroup.Item>

					<ListGroup.Item>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="2">
								Email
							</Form.Label>

							<Col sm="10">
								<Form.Label column sm="2">
									{email}
								</Form.Label>
							</Col>
						</Form.Group>
					</ListGroup.Item>

					<ListGroup.Item>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="2">
								Τηλέφωνο
							</Form.Label>

							<Col sm="10">
								<Form.Label column sm="2">
									{phone}
								</Form.Label>
							</Col>
						</Form.Group>
					</ListGroup.Item>

					<ListGroup.Item>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="2">
								Εππαγελματική θέση
							</Form.Label>

							<Col sm="10">
								<Form.Label column sm="2">
									{job}
								</Form.Label>
							</Col>
						</Form.Group>
					</ListGroup.Item>

					<ListGroup.Item>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="2">
								Φορέας Απασχόλησης
							</Form.Label>

							<Col sm="10">
								<Form.Label column sm="2">
									{employmentInstitution}
								</Form.Label>
							</Col>
						</Form.Group>
					</ListGroup.Item>
				</ListGroup>
			</Form>
		</Container>
	);
};

export default Profile;
