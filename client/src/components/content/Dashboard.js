import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth.js";

// local
import UserCard from "./UserCard.js";

export default function Dashboard() {
  // shows list of user cards.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:8675/api/restricted/users", {
        withCredentials: true
      })
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => console.log("error: ", err.message));
  }, []);

  if (!users.length) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>All Users! Yay!!!</h1>
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
}
