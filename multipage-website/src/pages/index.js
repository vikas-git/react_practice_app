import React, {useEffect} from 'react';

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
    });

    return (
        <div>
            <h1>Welcome to Home page</h1>
        </div>
    );
};

export default Home;
