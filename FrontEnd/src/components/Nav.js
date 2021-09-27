import { NavLink } from "react-router-dom";

import React, { useEffect, useRef } from "react";

const Nav = ({ setNavHeight }) => {
	const navRef = useRef(null);

	useEffect(() => {
		setNavHeight(navRef.current.clientHeight);
	}, [setNavHeight]);

	return (
		<nav
			className="navbar navbar-expand-md navbar-dark bg-dark mb-4"
			ref={navRef}
		>
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/home">
					<img
						src="https://localhost:8043/images/LionLogo.png"
						alt="Lion Logo"
						width="24"
						height="35"
					/>
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink
								exact
								activeClassName="active"
								className="nav-link"
								to="/home"
							>
								Αρχική Σελίδα
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								exact
								activeClassName="active"
								className="nav-link"
								to="/network"
							>
								Δίκτυο
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink
								exact
								activeClassName="active"
								className="nav-link"
								to="/adverts"
							>
								Αγγελίες
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink
								exact
								activeClassName="active"
								className="nav-link"
								to="/discussions"
							>
								Συζητήσεις
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink
								exact
								activeClassName="active"
								className="nav-link"
								to="/notifications"
							>
								Ειδοποιήσεις
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink
								exact
								activeClassName="active"
								className="nav-link"
								to="/personal"
							>
								Προσωπικά Στοιχεία
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink
								exact
								activeClassName="active"
								className="nav-link"
								to="/settings"
							>
								Ρυθμίσεις
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
