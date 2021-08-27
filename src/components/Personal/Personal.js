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

	const [isMyProfile, setIsMyProfile] = useState(false);
	const [isFriendsProfile, setIsFriendsProfile] = useState(true);

	useEffect(() => {
		const getExperience = async () => {
			const experienceFromServer = await fetchData("experience");

			setVisibleExperience(experienceFromServer.displayable);
			setExperience(experienceFromServer.text);
		};

		const getEducation = async () => {
			const educationFromServer = await fetchData("education");
			setEducation(educationFromServer.text);
			setVisibleEducation(educationFromServer.displayable);
		};

		const getSkills = async () => {
			const skillsFromServer = await fetchData("skills");
			setSkills(skillsFromServer.content.join("\n\n"));
			setVisibleSkills(skillsFromServer.visible);
		};

		const authResult = new URLSearchParams(window.location.search);
		const id = authResult.get("id");

		// Get mine or the person's id profile and experience (and etc...)
		if (id == null) {
			setIsMyProfile(true);
		} else {
			// Do get request to check if this id is mine, some friend or non friend.
		}

		getExperience();
		getEducation();
		// getSkills();
	}, [fetchData]);

	const addExperience = async (newExperience) => {
		sendData(newExperience, "experience", "PUT");
	};

	const addEducation = async (newEducation) => {
		sendData(newEducation, "education", "PUT");
	};

	const addSkills = async (newSkills) => {
		const newSkillsArr = {
			content: newSkills.content.trim().split("\n\n"),
			visible: newSkills.visible,
		};

		sendData(newSkillsArr, "skills", "PUT");
	};

	return (
		<Tabs defaultActiveKey="a" className="mb-3">
			<Tab eventKey="a" title="Προφίλ">
				<Profile
					isMyProfile={isMyProfile}
					isFriendsProfile={isFriendsProfile}
					fetchData={fetchData}
					sendData={sendData}
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
