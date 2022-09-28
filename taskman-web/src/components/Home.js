import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    useEffect(() => {
        document.title = 'Taskman - Home';
    });

    return (
        <div className='container'>
            <h2>Home page</h2>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/signup">Signup</Link>
        </div>
    )
}

export default Home;
