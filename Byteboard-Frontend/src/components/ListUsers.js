import { DisplayUser } from "./DisplayUser"
import { useNavigate } from "react-router-dom"

/**
 * Fetches a list of users
 * @param {Object} props
 * @returns A list of users
 */
function ListUsers({ users,deleteAccount }) {
    const navigate = useNavigate()

    try {
        return (
            <div>


                {users.map((user) => (

                    <DisplayUser user={user} deleteAccount={deleteAccount} />


                ))}

            </div>
        )
    }
    catch (error) {
        navigate("/usererror", { state: { errorMessage: "ERROR: No users in the database" } })
    }
}

export { ListUsers }