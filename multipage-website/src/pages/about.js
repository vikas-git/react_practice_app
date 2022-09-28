import React, { useEffect } from "react";

const About = () => {
    useEffect(() => {
        document.title = 'About us';
    });

    return (
        <div>
            <h1>
                GeeksforGeeks is a Computer
                Science portal for geeks.
            </h1>
        </div>
    );
};

export default About;
