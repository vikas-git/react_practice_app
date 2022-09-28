import React from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Tasks from './Tasks';
import Dashboard from './Dashboard';
import AddTask from './AddTask';

const Routing = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>} />

                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/tasks" element={<Tasks/>}/>
                    <Route path="/task/add-task" element={<AddTask/>}/>

                    {/* <Route path="/login" element={<PrivateRoute><Login/></PrivateRoute>}/>
                    <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path="/signup" element={<PrivateRoute><Signup/></PrivateRoute>} />

                    <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                    <Route path="/tasks" element={<PrivateRoute><Tasks/></PrivateRoute>}/>
                    <Route path="/task/add-task" element={<PrivateRoute><AddTask/></PrivateRoute>}/> */}

                    {/* <PrivateRoute path="/" component={Home} />
                    <PrivateRoute path="/signup" component={Signup} />
                    <PrivateRoute path="/tasks" component={Tasks} /> */}

                </Routes>
            </Router>
        </>
    )
}

export default Routing
