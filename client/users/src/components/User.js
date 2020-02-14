import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from "react-router-dom";

const User = props => {
    const [ user, setUser ] = useState([]);
    // const { id } = useParams();

    useEffect(() => {
        console.log(props.id);
        axios.get(`http://localhost:5000/users/${props.id}/posts`)
        .then(res => {
            console.log(res);
            setUser(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [props.id])

    console.log('user', user);

    return (
        <div>
            {
                user.map(user => <p>{user.text}</p>)
            }
        </div>
    );
}

export default User;