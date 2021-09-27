import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return isAuthenticated === true ? (
					children
				) : (
					<Redirect
						to={{ pathname: "/", state: { from: location } }}
					/>
				);
			}}
		/>
	);
};

export default PrivateRoute;
