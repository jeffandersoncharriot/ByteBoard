import { useLocation } from "react-router-dom";
import { AllPostsFromUser } from "../components/AllPostsFromUser";
import { DisplayUser } from "../components/DisplayUser"
import React, { useEffect, useState } from 'react';



/**
 * A page that displays the user's profile
 * @returns The user's profile
 */
const UserProfile = () => {
  const location = useLocation()
  const [user, setUser] = useState({})

  const getUser = async () => {
    try {

      const username = location.pathname.split("/")[2]


      fetch(`${process.env.REACT_APP_PUBLIC_URL}/users/usernames/${username}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setUser(data)
        })
    }
    catch (error) {
      alert(error.message)
    }

  }


  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      {user && (
        <ul>
          <DisplayUser user={user} />

          <h1>Description</h1>
          <h1>{user.description}</h1>
          <h1>Reputation: {user.reputation}</h1>


        </ul>
      )}

      {user && <AllPostsFromUser user={user} />}

    </div>
  )
}

export default UserProfile