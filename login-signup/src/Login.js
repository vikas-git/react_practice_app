import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';

import axios from './api/axios';
const LOGIN_URL = '/home/api/v1/login/verify-otp/';

const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ username:user, user_type:4, otp: '1111' }),
				{
					headers: {
						'Content-Type': 'application/json',
						'accept': 'application/json',
						'X-CSRFToken': 'hd3dmfjaF3mOQjyBmLJwBq5esfhPa6sJ9qwT74FgtO2r4N3JXp8vvs3wEqDUjKVH'
					},
					withCredentials: true,
				}
			);
			const resp = response?.data;
			// debugger
			const accessToken = resp?.data?.token;
			const user_detail = resp?.data?.user;
			console.log(user_detail)
			// setAuth({ user, accessToken });
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('user_detail', JSON.stringify(user_detail));
			setUser('');
			setPwd('');
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg(err.response.data.message);
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<section>
					<h1>You are logged in, {JSON.parse(localStorage.getItem('user_detail')).name}</h1>
					<br />
					<p>{/* <a href="#">Go to Home</a> */}</p>
				</section>
			) : (
				<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Sign In</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
						/>
						<button>Sign In</button>
					</form>
					<p>
						Need an Account?
						<br />
						<span className="line">
							<a href="/">Sign Up</a>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default Login;