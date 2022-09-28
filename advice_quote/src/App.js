import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [advice, setAdvice] = useState('')

    const fetch_advice = () =>{
        axios.get('https://api.adviceslip.com/advice')
        .then((response) =>{
            console.log('call')
            setAdvice(response?.data?.slip?.advice);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        fetch_advice();
    }, [])

    return (
        <div className="app">
        <div className="card">
          <h1 className="heading">{advice}</h1>
          <button className="button" onClick={fetch_advice}>
            <span>GIVE ME ADVICE!</span>
          </button>
        </div>
      </div>
    );
}

export default App;
