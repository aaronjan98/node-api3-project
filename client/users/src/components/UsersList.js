import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UsersCard from './UsersCard';

const UsersList = () => {
    const [ userInfo, setUserInfo ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);


    return(
        <UsersCard />
    );
}

export default UsersList;