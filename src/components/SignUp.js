const SignUp = () => {
	return (
		<form>
			<div className="login-box">
				<div className="box-header">
					<h2>Sign Up</h2>
				</div>

				<label for="first_name">First Name</label>
				<br />
				<input type="text" id="first_name" />
				<br />

				<label for="last_name">Last Name</label>
				<br />
				<input type="text" id="last_name" />
				<br />

				<label for="email">Email</label>
				<br />
				<input type="text" id="email" />
				<br />

				<label for="password">Password</label>
				<br />
				<input type="password" id="password" />
				<br />

				<label for="repeat_password">Repeat Your Password</label>
				<br />
				<input type="password" id="repeat_password" />
				<br />

				<label for="phone">Phone Number</label>
				<br />
				<input type="text" id="phone" />
				<br />

				<label for="photo">Upload a photo</label>
				<br />
				<input type="file" id="photo" />
				<br />

				<button type="submit">Sign Up</button>
			</div>
		</form>
	);
};

export default SignUp;
