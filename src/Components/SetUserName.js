import { useState, useEffect } from "react";
import { useTweetContext } from "./Context/TweetContext";

const SaveUserName = () => {
    //    const  {userLogin, setUserLogin} = useContext(UserContext)
    // const value = useMemo(()=> ({userLogin, setUserLogin}),[userLogin, setUserLogin])
    const { logIn="", setLogIn,} = useTweetContext();

    
 
    const handleChange = (event) => {
        setLogIn(event.target.value);
    };

    const handleSaveUser = (event) => {
        console.log(logIn)
    };
    // useEffect(() =>{
    //     const
    // })
    // const cerateLogIn = (logIn) =>{
    //     const value = logIn
    // }

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
    );
};

export default SaveUserName;
