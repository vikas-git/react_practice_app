import React, {useEffect, useRef, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import MessageTemp from './MessageTemp';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Signup() {
    if(localStorage.getItem('accessToken')){
        window.location = "/tasks";
    }
    useEffect(() => {
        document.title = 'Taskman - Signup';
    }, []);

    const nameRef = useRef();
    useEffect(() => {
		nameRef.current.focus();
	}, []);


    const [name, setName] = useState('');
	const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

    useEffect(() => {
		setErrMsg('');
	}, [name, email]);

    useEffect(() => {
		setValidName(USER_REGEX.test(name));
	}, [name]);

    useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

    useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);


    const navigate = useNavigate();
    const handleSubmit = async (e) => {
		e.preventDefault();
        // if( !validName || !validEmail || !validPwd){
        //     return
        // }

		try {
			const response = await axios.post(
				'/apis/user-manager/sign-up/',
				JSON.stringify({ username: name, email:email, password:pwd, confirm_password: matchPwd }),
				{
					headers: {
						'Content-Type': 'application/json',
						'accept': 'application/json'
					},
					withCredentials: true,
				}
			);
			const resp = response?.data;
			setName('');
			setEmail('');
			setPwd('');
			setMatchPwd('');
			setSuccess(true);

            // navigate("/login");
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
		}
	};


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">
                            <h3 className="panel-title text-center">User Registration</h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={handleSubmit}>
                                {/* {% csrf_token %} */}
                                <fieldset>
                                    {errMsg ? <MessageTemp message={errMsg} error={true}/>: ''}
                                    {success ? <MessageTemp message={'User register successfully'} error={false}/>: ''}

                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-user"></i></div>
                                            <input
                                                type="text"
                                                name="name"
                                                autoComplete="off"
							                    onChange={(e) => setName(e.target.value)}
							                    value={name}
                                                ref={nameRef}
                                                placeholder="Name"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-envelope"></i></div>
                                            <input
                                                type="email"
                                                name="email"
                                                autoComplete="off"
							                    onChange={(e) => setEmail(e.target.value)}
							                    value={email}
                                                placeholder="Email"
                                                className="form-control"
                                                required />
                                        </div>
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
                                                required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-lock"></i></div>
                                            <input
                                                onChange={(e) => setMatchPwd(e.target.value)}
                                                value={matchPwd}
                                                type="password"
                                                placeholder="Confirm Password"
                                                className="form-control"
                                                required />
                                        </div>
                                    </div>

                                    <button
                                        disabled={!validName || !validEmail ||  !validMatch}
                                        className="btn btn-lg btn-primary btn-block">
                                        Sign Up
                                    </button>

                                    <div className="pull-right">
                                        <Link to="/login">Login</Link>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
