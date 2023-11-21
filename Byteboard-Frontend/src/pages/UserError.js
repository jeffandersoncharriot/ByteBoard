import {Link,useLocation} from "react-router-dom"

/**
 * user error (NOT IN USE)
 * @returns user error when invalid movie was put
 */
function UserError()
{
    const {state} = useLocation()
    
    return(
        <div>
            <h1>There was an input error</h1>
            <p>{state.errorMessage}</p>
            <Link to="/">Home</Link>

        </div>
    )
}

export default UserError