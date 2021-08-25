import { useState, useEffect } from "react";
import {
	Form,
	Button,
	Container,
	Row,
	Col,
	ListGroup,
	Card,
} from "react-bootstrap";

import { Link } from "react-router-dom";

import "./Profile.css";

const Profile = ({ isMyProfile, isFriendsProfile, fetchData, sendData }) => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [job, setJob] = useState("");
	const [employmentInstitution, setEmploymentInstitution] = useState("");

	useEffect(() => {
		const getName = async () => {
			const nameFromServer = await fetchData("name");
			setName(nameFromServer);
		};

		const getSurname = async () => {
			const surnameFromServer = await fetchData("surname");
			setSurname(surnameFromServer);
		};

		const getEmail = async () => {
			const emailFromServer = await fetchData("email");
			setEmail(emailFromServer);
		};

		const getPhone = async () => {
			const phoneFromServer = await fetchData("phone");
			setPhone(phoneFromServer);
		};

		const getJob = async () => {
			const jobFromServer = await fetchData("job");
			setJob(jobFromServer);
		};

		const getEmploymentInstitution = async () => {
			const employmentInstitution = await fetchData(
				"employmentInstitution"
			);
			setEmploymentInstitution(employmentInstitution);
		};

		// getName();
		// getSurname();
		// getEmail();
		// getPhone();
		// getJob();
		// getEmploymentInstitution();
	}, [fetchData]);

	const addFriend = () => {};

	return (
		<Container>
			<Form>
				<ListGroup variant="flush">
					<ListGroup.Item>
						<Card style={{ width: "18rem" }}>
							<Card.Img
								variant="top"
								src="/images/Profile_10.png"
							/>
							{isMyProfile === false && (
								<Card.Body>
									{isFriendsProfile ? (
										<Link to="/discussions">
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
