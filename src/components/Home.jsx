import React, { useEffect } from 'react'
import axios from 'axios'
import { djurl } from '../utils/Global';

const Home = () => {

    useEffect(() => {
        axios({
          method: "GET",
          url: `${djurl}/account/profile_function`,
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            //handle success
            // Set user cookie for frontend
            console.log(response.data)
          })
          .catch((error) => {
              console.log(error.response.data);
          });

    }, [])


    return (
        <>
            <h1>Home</h1>
        </>
    )
}

export default Home