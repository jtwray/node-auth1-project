import React, { useState, useEffect } from 'react';
import axios from 'axios'

// local
import UserCard from './UserCard.js'

export default function Dashboard() {
    // shows list of user cards.
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8675/api/users')
        .then(res => {
            console.log(res)
            // setUsers(res.data)
        })
        .catch(err => console.log("error: ", err))
    }, [])

    if (!users) return <h1>Loading...</h1>
    return(
        <div>
            <h1>All Users! Yay!!!</h1>
            {users.map(user => {
                <UserCard user={user} />
            })}
        </div>
    )
}