import { Tabs, Tab } from "react-bootstrap";

import OtherAdverts from "./OtherAdverts";
import NewAdvert from "./NewAdvert";
import MyAdverts from "./MyAdverts";

import "./Adverts.css";

const Adverts = () => {
	return (
		<Tabs defaultActiveKey="a" className="mb-3">
			<Tab eventKey="a" title="Αγγελίες">
				<OtherAdverts />
			</Tab>
			<Tab eventKey="b" title="Δημιουργία Αγγελίας">
				<NewAdvert />
			</Tab>
			<Tab eventKey="c" title="Οι αγγελίες μου">
				<MyAdverts />
			</Tab>
		</Tabs>
	);
};

export default Adverts;