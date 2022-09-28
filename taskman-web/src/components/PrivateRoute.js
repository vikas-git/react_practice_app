import React, {useEffect, useState} from 'react'
import { useNavigate, Navigate } from 'react-router-dom'


const PrivateRoute = ({ children }) => {
    const[isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

    useEffect(()=>{
        console.log(isLoggedIn)
    });
    const storageFunc = ()=>{
        setIsLoggedIn(!! localStorage.getItem('accessToken'));
    }
    useEffect(()=> {
        window.addEventListener("storage", storageFunc);
        return window.removeEventListener("storage", storageFunc);
    }, []);


    let authNotRequired = ['/login', '', '/signup']
    const navigate = useNavigate();
    if(authNotRequired.indexOf(window.location.pathname) !== -1 && isLoggedIn){
        // navigate("/tasks");
        return <Navigate to="/tasks"/>
    }

    return isLoggedIn ? children : <Navigate to="/login"/>;

}

export default PrivateRoute