import { Container, OverlayTrigger, Tooltip, Button } from "react-bootstrap";

const Personal = () => {
	return (
		<Container>
			<form>
				<div className="login-box">
					<div className="box-header">
						<h2>Βάλε τα προσωπικά σου στοιχεία.</h2>
					</div>

					<br />

					<div className="input-group input-group-lg">
						<div className="input-group-prepend">
							<span className="input-group-text">
								Προσωπική εμπειρία
							</span>

							<div className="row align-items-center">
								<OverlayTrigger
									key="top"
									placement="top"
									overlay={
										<Tooltip id={`tooltip-top`}>
											Εμφάνιση σε όλους
										</Tooltip>
									}
								>
									<input
										type="checkbox"
										aria-label="experience"
									/>
								</OverlayTrigger>
							</div>
						</div>

						<br />

						<textarea
							className="form-control"
							aria-label="experience"
							rows="5"
						></textarea>
					</div>

					<br />

					<div className="input-group input-group-lg">
						<div className="input-group-prepend">
							<span className="input-group-text">Εκπαίδευση</span>

							<div className="row align-items-center">
								<OverlayTrigger
									key="top"
									placement="top"
									overlay={
										<Tooltip id={`tooltip-top`}>
											Εμφάνιση σε όλους
										</Tooltip>
									}
								>
									<input
										type="checkbox"
										aria-label="experience"
									/>
								</OverlayTrigger>
							</div>
						</div>
						<textarea
							className="form-control"
							aria-label="education"
							rows="5"
						></textarea>
					</div>

					<br />

					<div className="input-group input-group-lg">
						<div className="input-group-prepend">
							<span className="input-group-text">Ικανότητες</span>

							<div className="row align-items-center">
								<OverlayTrigger
									key="top"
									placement="top"
									overlay={
										<Tooltip id={`tooltip-top`}>
											Εμφάνιση σε όλους
										</Tooltip>
									}
								>
									<input
										type="checkbox"
										aria-label="experience"
									/>
								</OverlayTrigger>
							</div>
						</div>

						<textarea
							className="form-control"
							aria-label="abilities"
							rows="5"
						></textarea>
					</div>

					<br />
					<div className="d-flex justify-content-center">
						<Button
							as="input"
							type="submit"
							value="Submit"
							readOnly
						/>
					</div>
					<br />
				</div>
			</form>
		</Container>
	);
};

export default Personal;
