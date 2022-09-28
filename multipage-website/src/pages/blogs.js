import React, {useEffect} from 'react';

const Blogs = () => {
	useEffect(() => {
        document.title = 'Blogs';
    });
return (
	<h1>You can write your blogs!</h1>
);
};

export default Blogs;
