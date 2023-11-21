import { useNavigate } from "react-router-dom";
import { AllPostsFromUser } from "../components/AllPostsFromUser";
import { DisplayUser } from "../components/DisplayUser"
import React, { useEffect, useState } from 'react';
import { UpdateDescriptionForm } from "../components/UpdateDescription";



/**
 * Gets the user's profile
 * @returns The user's profile
 */
const Profile = () => {

  const [user, setUser] = useState(null)
  const navigate = useNavigate()


  const getUserProfile = async () => {


    const res = await fetch(process.env.REACT_APP_PUBLIC_URL + "/session/getUsername",
      { method: "GET", credentials: "include" });


    if (res.status !== 200) {
      navigate("/", { state: { errorMessage: "You are not logged in" } })
    }

    const user = await res.json();

    const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/users/usernames/${user.username}`)

    let result = await response.json()

    setUser(result)

  }




  useEffect(() => {
    getUserProfile()
  }, [])



  return (
    <div>
      {user && (
        <ul>
          <DisplayUser user={user} />

          <h1><u>Description</u></h1>
          <h1>{user.description}</h1>
          <h1>Reputation: {user.reputation}</h1>


        </ul>
      )}

      <UpdateDescriptionForm />
      {user && <AllPostsFromUser user={user} update={true}/>}

    </div>
  )


}

export default Profile