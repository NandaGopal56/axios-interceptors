import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { djurl, parseJwt, SetLoginCookie, RemoveLoginCookie } from '../utils/Global';
import axios from "axios";

const Signin = () => {

  let navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  };

  const HandelSubmit = (e) => {
    e.preventDefault()
    var bodyFormData = new FormData();
    for (var key in values) {
      bodyFormData.append(key, values[key]);
    }

    axios({
      method: "POST",
      url: `${djurl}/account/signin`,
      data: bodyFormData,
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        //handle success
        // Set user cookie for frontend
        const userID = parseJwt(response.data.access_token).userId
        SetLoginCookie(userID, true)
        navigate('/');
      })
      .catch((error) => {
        RemoveLoginCookie('userID', 'isLoggedin')

        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  }

    return (
        <>
            
        <form onSubmit={HandelSubmit}>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Email address</label>
            <input type="email" 
                id="form2Example1" 
                className="form-control" 
                name="email"
                autoComplete="off"
                value={values.email} onChange={set('email')} required/>
          </div>


          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" 
                id="form2Example2" 
                className="form-control" 
                name="password"
                autoComplete="off"
                value={values.password} onChange={set('password')} required/>
          </div>


          <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
        </form>

        </>
    )
}

export default Signin;