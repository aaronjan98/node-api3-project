import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UsersCard from './UsersCard';

const UsersList = () => {
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then(res => {
            console.log(res.data);
            setUsers(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);


    return(
        <>
        {users.map(user => {
            return (
            <UsersCard 
            key={user.id}
            name={user.name}
            />
            );
        })}


        </>
    );
}

export default UsersList;