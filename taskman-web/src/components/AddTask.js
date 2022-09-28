import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from '../api/axios';
import MessageTemp from './MessageTemp';

const AddTask = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const [validName, setValidName] = useState(false);
    const [validDate, setValidDate] = useState(false);

    useEffect(() => {
		setValidName(name.length >= 3);
	}, [name]);

    useEffect(() => {
		setValidDate(date.length >=8)
	}, [date]);

    const [errMsg, setErrMsg] = useState(false);
    useEffect(() => {
		setErrMsg('');
	}, [name, date]);

    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);


    const handlerFormSubmit = async (e) => {
		e.preventDefault();
        if( !validName || !validDate){
            return
        }
        
		try {
			const response = await axios.post(
				'/apis/tasks/task/',
				JSON.stringify({ name:name, deadline:date }),
				{
					headers: {
						'Content-Type': 'application/json',
						'accept': 'application/json',
                        'Authorization': 'Token '+localStorage.getItem('accessToken')
					},
				}
			);
			const resp = response?.data;
			setName('');
			setDate('');
			setSuccess(true);
            setSuccessMsg('Task created successfully')
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
        <>
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Add Task</h1>
                            </div>
                        </div>

                        <form onSubmit={handlerFormSubmit}>
                            <div>
                                {errMsg ? <MessageTemp message={errMsg} error={true}/>: ''}
                                {successMsg ? <MessageTemp message={successMsg} error={false}/>: ''}
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><i className="fa fa-user"></i></div>
                                    <input
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        placeholder="Name"
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><i className="fa fa-user"></i></div>
                                    <input
                                        value={date}
                                        onChange={(e)=>setDate(e.target.value)}
                                        type="datetime-local"
                                        autoComplete="off"
                                        placeholder="Name"
                                        className="form-control"
                                        required 
                                    />
                                </div>
                            </div>

                            <button
                                disabled={!validName || !validDate}
                                className="btn btn-lg btn-primary btn-block">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>\
            </div>
        </>

        
    )
}

export default AddTask
