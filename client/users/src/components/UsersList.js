import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import UsersCard from './UsersCard';
import User from './User';

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
                    <UserDetails 
                    key={user.id}
                    user={user}
                    />
                );
            })}
        </>
    );
}

function UserDetails({ user }) {
    const { id, name } = user;

    return (
      <NavLink to={`/users/${id}/posts`}>
        <User name={name} id={id}/>
      </NavLink>
    );
}

export default UsersList;