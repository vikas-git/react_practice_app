import React, { useState } from 'react'
import {dateFormat} from '../utils.js'
import { Link } from "react-router-dom";
import axios from '../api/axios';

const TaskList = ({task}) => {
    const status = task.status === 0 ? 'Incomplete' : 'Complete'

    const updateStatus = async (_id, status) =>{
        try {
			const response = await axios.patch(
				'/apis/tasks/task/'+_id+'/',
				JSON.stringify({ status:status }),
				{
					headers: {
						'Content-Type': 'application/json',
						'accept': 'application/json',
                        'Authorization': 'Token '+localStorage.getItem('accessToken')
					},
				}
			);
			const resp = response?.data;
            console.log(resp);
            window.location = '/tasks'
		} catch (err) {
            console.log(err)
        }
    }

    const deleteHandler = async (_id) =>{
        if (window.confirm('Do you really want to delete ?')) {
            try {
                const response = await axios.delete(
                    '/apis/tasks/task/'+_id+'/',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json',
                            'Authorization': 'Token '+localStorage.getItem('accessToken')
                        },
                    }
                );
                const resp = response?.data;
                console.log(resp);
                window.location = '/tasks'
            } catch (err) {
                console.log(err)
            }
        }

        
    }

    return (
        <tr>
            <td>{task.name}</td>
            <td>{dateFormat(task.deadline)}</td>
            <td>{status}</td>
            <td>{dateFormat(task.created_on)}</td>
            <td>
                {
                    task.status == 0 ?
                    <Link to='#' onClick={()=>updateStatus(task.id, 1)} title="Mark as Complete">Mark as Complete</Link> : 
                    <Link to='#' onClick={()=>updateStatus(task.id, 0)} title="Mark as Incomplete">Mark as Incomplete</Link>
                }

                <Link to='#' onClick={()=>deleteHandler(task.id)} title="Delete"><i className="fa fa-trash"></i></Link>
            </td>
        </tr>
    )
}

export default TaskList
