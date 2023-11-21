import { useState } from "react"
import { ListUsers } from "./ListUsers"
import { useEffect } from "react";

/**
 * Gets all the users from a fetch request
 * @returns A list of all the users
 */
function AllUsers({deleteAdmin}) {
    const [users, setUsers] = useState([])

    const callGetAllUsers = async () => {

        const response = await fetch("http://localhost:1339/users",
            { method: "GET" });

        const result = await response.json();

        setUsers(result)
    };





    useEffect(() => {
        callGetAllUsers()
      }, [])


    return (
        <>

          
<div className="users">
            <ListUsers users={users} deleteAccount={deleteAdmin} />
            </div>
        </>
    )
}

export { AllUsers }