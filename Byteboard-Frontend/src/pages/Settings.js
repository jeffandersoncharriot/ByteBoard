import DeleteAccountButton from "../components/DeleteAccountButton"
import { EmailChangeForm } from "../components/EmailChangeForm"
import { PasswordChangeForm } from "../components/PasswordChangeForm"
import { UsernameChangeForm } from "../components/UsernameChangeForm"
import "../components/App.css"

function Settings()
{
    return(
        <div className="settings">
       <UsernameChangeForm/>     
<EmailChangeForm/>
<PasswordChangeForm/>
<br/>

<DeleteAccountButton/>
        </div>
    )
}


export default Settings