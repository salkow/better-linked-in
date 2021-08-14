import { Tabs, Tab } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

import TextArea from "./TextArea";

const Personal = ({ navHeight, pageHeight }) => {
	const [experience, setExperience] = useState("");
	const [visibleExperience, setVisibleExperience] = useState(false);

	const [education, setEducation] = useState("");
	const [visibleEducation, setVisibleEducation] = useState(false);

	const [skills, setSkills] = useState("");
	const [visibleSkills, setVisibleSkills] = useState(false);

	useEffect(() => {
		const getExperinece = async () => {
			const experienceFromServer = await fetchData("userexperience");
			// setExperience(experienceFromServer.text);
			// setVisibleExperience(experienceFromServer.displayable);
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
		// getEducation();
		// getSkills();
	}, []);

	const fetchData = async (topic) => {
		// const res = await fetch(`http://localhost:8081/api/v1/${topic}`, {
		// 	method: "GET",
		// 	headers: {
		// 		Accept: "application/json",
		// 	},
		// });

		const res = await fetch(`http://localhost:8081/api/v1/${topic}`);

		console.log(res);

		// const data = await res.json();

		// console.log(data);

		// return data;

		// axios.get(`http://localhost:8081/api/v1/${topic}`).then((response) => {
		// 	console.log(response);
		// });
	};

	const addExperience = async (newExperience) => {
		const res = await fetch("http://localhost:8081/api/v1/userexperience", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
		});

		const data = await res.json();

		setExperience(experience, data.content);
		setVisibleExperience(visibleExperience, data.visible);
	};

	const addEducation = async (newEducation) => {
		const res = await fetch("http://localhost:8081/api/v1/usereducation", {
			method: "POST",
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
