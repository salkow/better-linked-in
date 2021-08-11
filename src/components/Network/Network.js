import { Container } from "react-bootstrap";

import "./Network.css";

import People from "./People";
import Search from "./Search";

const Network = () => {
	return (
		<Container>
			<Search />
			<People />
		</Container>
	);
};

export default Network;
