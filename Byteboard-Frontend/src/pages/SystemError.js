import {Link} from "react-router-dom"

/**
 * System error displayed with error message and button home to go back to home page
 * @param {String} errorMessage error message of what occured
 * @returns system error and home link
 */
function SystemError({errorMessage})
{
    return(
        <div>
            <h1>ERROR: There was a system error</h1>
            <p>{errorMessage}</p>
            <Link to ="/">Home</Link>
        </div>
    )
}

export default SystemError