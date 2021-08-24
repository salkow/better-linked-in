import { Container } from "react-bootstrap";

import "./Network.css";

import People from "./People";
import Search from "./Search";

const Network = ({ fetchData, sendData }) => {
	return (
		<Container>
			<Search sendData={sendData} />
			<People fetchData={fetchData} />
		</Container>
	);
};

export default Network;
