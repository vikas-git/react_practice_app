import React, { useEffect } from "react";

const About = () => {
    useEffect(() => {
        document.title = 'About us';
    });

    return (
        <div>
            <h1>
                About us page
            </h1>
        </div>
    );
};

export default About;
