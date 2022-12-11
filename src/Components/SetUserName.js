import { useState } from "react"

const SaveUserName = (handleAddLogIn) => {

    const [logIn, setLogIn] = useState('')
    const characterLimit = 140
    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setLogIn(event.target.value);
        }
    };
    const handleSaveUser = () => {
        if (logIn.trim().length > 0) {
            handleAddLogIn(logIn)
            setLogIn("")
        }
    };


    return (
        <div className="userName new">
            <textarea
                rows="1"
                cols="20"
                placeholder="Add a UserName"
                value={logIn}
                onChange={handleChange}
            ></textarea>
            <button className="submit" onClick={handleSaveUser}>
                        Save User
                    </button>
            </div>
            
            )
}

export default SaveUserName