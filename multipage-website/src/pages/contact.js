import React, {useEffect} from 'react';

const Contact = () => {
	useEffect(() => {
        document.title = 'Contact Us';
    });
return (
	<div>
	<h1>Mail us on feedback@geeksforgeeks.org</h1>
	</div>
);
};

export default Contact;
