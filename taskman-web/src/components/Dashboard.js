import React from 'react';
import Navbar from './Navbar';

const Dashboard = () => {
    return (
        <>
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Dashboard</h1>
                            </div>
                        </div>

                        <h2>Welcome to User Dashboard</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
