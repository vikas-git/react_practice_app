import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    const logoutHandle = (e) =>{
        e.preventDefault();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user_detail');
        window.location.reload();
    }
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="">
                <Link className="navbar-brand" to="/dashboard">TaskMan</Link>
            </div>

            <div className="">
                <ul className="nav navbar-nav side-nav" id="sidebar">
                    {/* <li className="text-right visible-xs">
                        <Link to="#"><i className="fa fa-fw fa-arrow-left close-sidebar"></i></Link>
                    </li> */}

                    <li>
                        <Link to="/dashboard"><i className="fa fa-fw fa-list"></i> Dashboard</Link>
                    </li>

                    {/* <li>
                        <Link to="/users"><i className="fa fa-fw fa-user"></i> Users</Link>
                    </li> */}

                    <li>
                        <Link to="/tasks"><i className="fa fa-fw fa-list"></i> Tasks</Link>
                    </li>

                    <li>
                        <Link to="#" onClick={logoutHandle}><i className="fa fa-fw fa-list"></i> Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar
