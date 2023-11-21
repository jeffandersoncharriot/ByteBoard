import { useRef } from "react";
import { useCookies } from "react-cookie";

/**
 * Provides a forum to enter a name
 * @returns A form to enter a name
 */
function NameForm() {
    const nameRef = useRef(null)
    const [cookies, setCookie] = useCookies(["name"])

    const handleSubmit = async (event) => {
        event.preventDefault()

        setCookie("name", nameRef.current.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name..." ref={nameRef} required />
            <button type="submit">submit</button>

        </form>

    )
}

export {NameForm}