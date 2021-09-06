import { Tabs, Tab } from "react-bootstrap";
import { useState, useEffect } from "react";

import TextArea from "./TextArea";
import Profile from "./Profile";

const Personal = ({ navHeight, pageHeight, fetchData, sendData }) => {
	const [experience, setExperience] = useState("");
	const [visibleExperience, setVisibleExperience] = useState(false);

	const [education, setEducation] = useState("");
	const [visibleEducation, setVisibleEducation] = useState(false);

	const [skills, setSkills] = useState("");
	const [visibleSkills, setVisibleSkills] = useState(false);

	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [job, setJob] = useState("");
	const [employmentInstitution, setEmploymentInstitution] = useState("");
	const [photoPath, setPhotoPath] = useState("");

	const [isMyProfile, setIsMyProfile] = useState(false);
	const [isFriendsProfile, setIsFriendsProfile] = useState(true);

	const [myId, setMyId] = useState("");

	useEffect(() => {
		const getMyId = async () => {
			const idFromServer = await fetchData("id");
			setMyId(idFromServer);
		};

		const getPersonalData = async (id) => {
			const dataFromServer = await fetchData("user/" + id);

			setExperience(dataFromServer.experienceText);
			setVisibleExperience(dataFromServer.experienceDisplayable);

			setEducation(dataFromServer.educationText);
			setVisibleEducation(dataFromServer.educationDisplayable);

			setSkills(dataFromServer.skillsText);
			setVisibleSkills(dataFromServer.skillsDisplayable);

			setId(dataFromServer.id);
			setName(dataFromServer.firstName);
			setSurname(dataFromServer.lastName);
			setEmail(dataFromServer.email);
			setPhone(dataFromServer.phone);
			setJob(dataFromServer.job);
			setEmploymentInstitution(dataFromServer.company);
			setPhotoPath(dataFromServer.photoPath);
		};

		const setUpData = async () => {
			const authResult = new URLSearchParams(window.location.search);
			const id = authResult.get("id");

			// Get mine or the person's id profile data.
			if (id === null) {
				setIsMyProfile(true);

				getPersonalData("");
			} else {
				getMyId();

				if (myId === id) {
					setIsMyProfile(true);
				} else {
					const isFriendFromServer = await fetchData(
						"checkFriend/" + id
					);

					setIsFriendsProfile(isFriendFromServer);
				}

				getPersonalData(id);
			}
		};

		setUpData();
	}, [fetchData, myId]);

	const addExperience = async (newExperience) => {
		sendData(newExperience, "experience", "PUT");
	};

	const addEducation = async (newEducation) => {
		sendData(newEducation, "education", "PUT");
	};

	const addSkills = async (newSkills) => {
		sendData(newSkills, "skills", "PUT");
	};

	return (
		<Tabs defaultActiveKey="a" className="mb-3">
			<Tab eventKey="a" title="Προφίλ">
				<Profile
					isMyProfile={isMyProfile}
					isFriendsProfile={isFriendsProfile}
					sendData={sendData}
					id={id}
					name={name}
					surname={surname}
					email={email}
					phone={phone}
					job={job}
					employmentInstitution={employmentInstitution}
					photoPath={photoPath}
				/>
			</Tab>
			<Tab eventKey="b" title="Προσωπική εμπειρία">
				<TextArea
					textFromServer={experience}
					visibleFromServer={visibleExperience}
					addText={addExperience}
					navHeight={navHeight}
					pageHeight={pageHeight}
					placeholderText="Γράψε εδώ..."
					isMyProfile={isMyProfile}
				/>
			</Tab>
			<Tab eventKey="c" title="Εκπαίδευση">
				<TextArea
					textFromServer={education}
					visibleFromServer={visibleEducation}
					addText={addEducation}
					navHeight={navHeight}
					pageHeight={pageHeight}
					placeholderText="Γράψε εδώ..."
					isMyProfile={isMyProfile}
				/>
			</Tab>
			<Tab eventKey="d" title="Δεξιότητες">
				<TextArea
					textFromServer={skills}
					visibleFromServer={visibleSkills}
					addText={addSkills}
					navHeight={navHeight}
					pageHeight={pageHeight}
					placeholderText="Γράψε εδώ... (Άφησε μια κενή γραμμή ανά δεξιότητα)"
					isMyProfile={isMyProfile}
				/>
			</Tab>
		</Tabs>
	);
};

export default Personal;
