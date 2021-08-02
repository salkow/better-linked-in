import { Tabs, Tab } from "react-bootstrap";
import { useState, useEffect } from "react";

import TextArea from "./TextArea";

const Personal = () => {
	const [experience, setExperience] = useState("");
	const [visibleExperience, setVisibleExperience] = useState("off");

	const [education, setEducation] = useState("");
	const [visibleEducation, setVisibleEducation] = useState("off");

	const [skills, setSkills] = useState("");
	const [visibleSkills, setVisibleSkills] = useState("off");

	useEffect(() => {
		const getExperinece = async () => {
			const experienceFromServer = await fetchData("experience");
			setExperience(experienceFromServer.content);
			setVisibleExperience(experienceFromServer.visible);
		};

		const getEducation = async () => {
			const educationFromServer = await fetchData("education");
			setEducation(educationFromServer.content);
			setVisibleEducation(educationFromServer.visible);
		};

		const getSkills = async () => {
			const skillsFromServer = await fetchData("skills");
			setSkills(skillsFromServer.content);
			setVisibleSkills(skillsFromServer.visible);
		};

		getExperinece();
		getEducation();
		getSkills();
	}, []);

	const fetchData = async (topic) => {
		const res = await fetch(`http://localhost:5000/${topic}`);

		const data = await res.json();

		return data;
	};

	const addExperience = async (newExperience) => {
		const res = await fetch("http://localhost:5000/experience", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newExperience),
		});

		const data = await res.json();

		setExperience(experience, data.content);
		setVisibleExperience(visibleExperience, data.visible);
	};

	const addEducation = async (newEducation) => {
		const res = await fetch("http://localhost:5000/education", {
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
		const res = await fetch("http://localhost:5000/skills", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newSkills),
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
				/>
			</Tab>
			<Tab eventKey="b" title="Εκπαίδευση">
				<TextArea
					textFromServer={education}
					visibleFromServer={visibleEducation}
					addText={addEducation}
				/>
			</Tab>
			<Tab eventKey="c" title="Ικανότητες">
				<TextArea
					textFromServer={skills}
					visibleFromServer={visibleSkills}
					addText={addSkills}
				/>
			</Tab>
		</Tabs>
	);
};

export default Personal;
