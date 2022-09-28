import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import axios from '../api/axios';
import TaskList from './TaskList';

const Tasks = () => {
    const [tasks, setTasks] = useState([])

    async function taskList(){
        try {
            const response =  await axios.get(
                '/apis/tasks/task/',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': 'Token '+localStorage.getItem('accessToken')
                    }
                }
            );
            let tasks_data = response?.data
            setTasks(tasks_data)
         } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        taskList();
    }, [])

    return (
        <>
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Task</h1>
                            </div>
                        </div>

                        {/* start : page content */}
                        <div className="row mb-10">
                            <div className="col-md-12">
                                <div className="pull-right" role="toolbar" aria-label="Page Actions">

                                    <div className="btn-group" role="group" aria-label="Page Action">
                                        <Link to='/task/add-task' className="btn btn-primary" title="Create New Task">Add Task <i className="fa fa-plus" aria-hidden="true"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                {/* <div id="flash_msg">{% include "partial/msg-temp.html" %}</div> */}
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Deadline</th>
                                                <th>Status</th>
                                                <th>Created on</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                // (tasks.length > 0) ? tasks.map((task, key) => <TaskList key={task.id} task={task} /> ) : <tr key="1">No record found</tr>
                                                (tasks.length > 0) && tasks.map((task, key) => <TaskList key={task.id} task={task} /> )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* end : page content */}

                    </div>
                </div>
                {/* <footer id="page-footer">
                    <div className="text-center text-muted">&copy; 2018 - TaskMan</div>
                </footer> */}
            </div>
        </>
  )
}

export default Tasks
