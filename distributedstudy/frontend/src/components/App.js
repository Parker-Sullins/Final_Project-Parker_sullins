import React, {Component, useState, createContext, useEffect} from 'react';
import Navbar from "./navbar";
import HomePage from "./homepage";
import {getCookie} from './csfr_token'
import axios from "axios";


export const csrfContext = React.createContext('');
const csrftoken = getCookie('csrftoken')

export const userContext = React.createContext('');
export const courseContext = React.createContext('')


 function App()  {

    const [currentUser, setUser] = useState('')
    const getUsers = async () => {
        try {
            const response = await axios.get('/api/users/')
            const { data } = response
            const current_user = data.filter(data => data.loggedIn === true)
            const username = current_user[0]['username']
            const userID = current_user[0]['id']
            const test = {id: userID,user: username}
            console.log(test)
            setUser(test)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])




        return (
        <React.Fragment>
            <courseContext.Provider value={'usercourses'}>
            <userContext.Provider value={currentUser}>
            <csrfContext.Provider value={{"X-CSRFTOKEN": csrftoken}}>
            <body id={"site-body"}>

                <HomePage />

            </body>
            </csrfContext.Provider>
            </userContext.Provider>
            </courseContext.Provider>
        </React.Fragment>
    )

}

export default App


//<courseContext.provider value={'usercourses'}>
//</courseContext.provider>
