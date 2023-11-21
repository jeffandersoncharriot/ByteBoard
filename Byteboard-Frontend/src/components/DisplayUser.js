import Card from "./Card"
import './App.css'
import DeleteAccountButtonAdmin from "./DeleteAccountButtonAdmin"

/**
 * Displays the user's information
 * @param {Object} props
 * @returns A card with the user's information
 */
function DisplayUser(props) {


let sendMailUrl = `mailto:“${props.user.email}”`


    return (

        <>

            {/* Display the user */}

            <Card
                link={`profile/${props.user.username}`}
                image={props.user.profilePicture}
                children={
                    <>


                        {props.heading}
                        {props.user.username && <h1>{props.user.username}</h1>}
                        <a href={sendMailUrl}>
                        {props.user.email && <h3>{props.user.email}</h3>}
                        </a>
{props.deleteAccount && <DeleteAccountButtonAdmin username={props.user.username}/>}
                    </>
                }

              
            />

        </>
    )
}

export { DisplayUser }