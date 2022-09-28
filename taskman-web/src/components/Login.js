import React, {useEffect, useRef, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import MessageTemp from './MessageTemp';

const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/;
const LOGIN_URL = '/apis/user-manager/sign-in/';

const Login = () => {

    useEffect(() => {
        document.title = 'Taskman - Login';
    });
    const emailRef = useRef();

    useEffect(() => {
		emailRef.current.focus();
	}, []);

    const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);

	const [success, setSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState(false);

    useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

    useEffect(() => {
		setValidPwd(pwd.length >= 3)
	}, [pwd]);

    useEffect(() => {
		setErrMsg('');
	}, [email, pwd]);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
		e.preventDefault();
        if( !validEmail || !validPwd){
            return
        }

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ email:email, password:pwd }),
				{
					headers: {
						'Content-Type': 'application/json',
						'accept': 'application/json'
					},
					withCredentials: true,
				}
			);
			const resp = response?.data;
			const accessToken = resp?.token;
			const user_detail = resp?.user;
			console.log(JSON.stringify(user_detail), accessToken)

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('user_detail', JSON.stringify(user_detail));
			setEmail('');
			setPwd('');
			setSuccess(true);

            navigate("/tasks");
            // window.location = "/tasks";
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg(err.response.data);
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
            console.log(errMsg)
		}
	};

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">
                            <h3 className="panel-title text-center">User Login</h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={handleSubmit}>
                                    {/* {% csrf_token %} */}
                                <fieldset>
                                    {errMsg ? <MessageTemp message={errMsg} error={true}/>: ''}

                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-envelope"></i></div>
                                            <input
                                                name="email"
                                                autoComplete="off"
							                    onChange={(e) => setEmail(e.target.value)}
							                    value={email}
                                                type="text"
                                                ref={emailRef}
                                                placeholder="Email"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        {/* {{ field.errors }} */}
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-lock"></i></div>
                                            <input
                                                onChange={(e) => setPwd(e.target.value)}
                                                value={pwd}
                                                type="password"
                                                placeholder="Password"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        {/* {{ field.errors }} */}
                                    </div>

                                    <button
                                        disabled={!validEmail || !validPwd}
                                        className="btn btn-lg btn-primary btn-block">
                                        Login
                                    </button>

                                    <div className="pull-right"><Link to="/signup">Sign up</Link></div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;