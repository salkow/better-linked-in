import { Link } from "react-router-dom";

const SignIn = () => {
	return (
		<form>
			<div className="login-box">
				<div className="box-header">
					<h2>Sign In</h2>
				</div>
				<label for="email">Email</label>
				<br />
				<input type="text" id="email" />
				<br />
				<label for="password">Password</label>
				<br />
				<input type="password" id="password" />
				<br />
				<button type="submit">Sign In</button>
				<br />
				<br />
				<Link to="/sign-up">
					<u>Sign up here.</u>
				</Link>
			</div>
		</form>
	);
};

export default SignIn;
