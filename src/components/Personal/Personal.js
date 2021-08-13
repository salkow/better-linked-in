import { Tabs, Tab } from "react-bootstrap";
import { useState, useEffect } from "react";

import TextArea from "./TextArea";

const Personal = ({ navHeight, pageHeight }) => {
	const [experience, setExperience] = useState("");
	const [visibleExperience, setVisibleExperience] = useState(false);

	const [education, setEducation] = useState("");
	const [visibleEducation, setVisibleEducation] = useState(false);

	const [skills, setSkills] = useState("");
	const [visibleSkills, setVisibleSkills] = useState("off");

	useEffect(() => {
		const getExperinece = async () => {
			const experienceFromServer = await fetchData("userexperience");
			setExperience(experienceFromServer.text);
			setVisibleExperience(experienceFromServer.displayable);
		};

		const getEducation = async () => {
			const educationFromServer = await fetchData("usereducation");
			setEducation(educationFromServer.text);
			setVisibleEducation(educationFromServer.displayable);
		};

		const getSkills = async () => {
			const skillsFromServer = await fetchData("skills");
			setSkills(skillsFromServer.content.join("\n\n"));
			setVisibleSkills(skillsFromServer.visible);
		};

		getExperinece();
		getEducation();
		getSkills();
	}, []);

	const fetchData = async (topic) => {
		const res = await fetch(`http://localhost:8081/api/v1/${topic}`);

		const data = await res.json();

		return data;
	};

	const addExperience = async (newExperience) => {
		const res = await fetch("http://localhost:8081/api/v1/userexperience", {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				"Access-Control-Allow-Origin" : "*"
			},
			body: JSON.stringify(newExperience),
		});

		const data = await res.json();

		setExperience(experience, data.content);
		setVisibleExperience(visibleExperience, data.visible);
	};

	const addEducation = async (newEducation) => {
		const res = await fetch("http://localhost:8081/api/v1/usereducation", {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newEducation),
		});

		const data = await res.json();

		setEducation(education, data.content);
		setVisibleEducation(visibleSkills, data.visible);
	};

	const addSkills = async (newSkills) => {
		const newSkillsArr = {
			content: newSkills.content.trim().split("\n\n"),
			visible: newSkills.visible,
		};

		const res = await fetch("http://localhost:5000/skills", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newSkillsArr),
		});

		const data = await res.json();

		setSkills(skills, data.content);
		setVisibleSkills(visibleEducation, data.visible);
	};

	return (
		<Tabs defaultActiveKey="a" className="mb-3">
			<Tab eventKey="a" title="Προσωπική εμπειρία">
				<TextArea
					textFromServer={experience}
					visibleFromServer={visibleExperience}
					addText={addExperience}
					navHeight={navHeight}
					pageHeight={pageHeight}
					placeholderText="Γράψε εδώ..."
				/>
			</Tab>
			<Tab eventKey="b" title="Εκπαίδευση">
				<TextArea
					textFromServer={education}
					visibleFromServer={visibleEducation}
					addText={addEducation}
					navHeight={navHeight}
					pageHeight={pageHeight}
					placeholderText="Γράψε εδώ..."
				/>
			</Tab>
			<Tab eventKey="c" title="Ικανότητες">
				<TextArea
					textFromServer={skills}
					visibleFromServer={visibleSkills}
					addText={addSkills}
					navHeight={navHeight}
					pageHeight={pageHeight}
					placeholderText="Γράψε εδώ... (Άφησε μια κενή γραμμή ανά δεξιότητα)"
				/>
			</Tab>
		</Tabs>
	);
};

export default Personal;
