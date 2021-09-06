import {
	InputGroup,
	Form,
	FormControl,
	Button,
	ListGroup,
	Accordion,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const Search = ({ sendData }) => {
	const [input, setInput] = useState("");
	const [results, setResults] = useState([]);
	const [showResults, setShowResults] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();

		const data = sendData({ text: input }, "search");

		setResults(data);

		setShowResults(true);
	};

	return (
		<div>
			<Form onSubmit={onSubmit}>
				<InputGroup className="mb-3" id="searchBar">
					<FormControl
						placeholder="Γράψε εδώ"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						required
					/>
					<Button type="submit" readOnly>
						Αναζήτηση
					</Button>
				</InputGroup>
			</Form>

			{showResults && (
				<Accordion defaultActiveKey="0" flush id="results">
					<Accordion.Item eventKey="0">
						<Accordion.Header>
							Αποτελέσματα αναζήτησης
						</Accordion.Header>
						<Accordion.Body>
							<ListGroup variant="flush">
								{results.map((result, index) => (
									<ListGroup.Item key={index}>
										<Link to={"/personal?id=" + result.id}>
											{result.name}
										</Link>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			)}
		</div>
	);
};

export default Search;
