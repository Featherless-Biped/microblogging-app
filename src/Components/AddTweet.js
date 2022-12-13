import React, { useEffect, useState, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import { useTweetContext } from "./Context/TweetContext";

const AddTweet = ({tweet,}) => {
    const {
        tweets,
        showSpinner,
        showToast,
        toastMessage,
        setShowToast,
        addTweet,
        setShowSpinner,
        logIn,
        setLogIn
        
    } = useTweetContext();
    const [tweetContent, setTweetContent] = useState("");

    //    const  {userLogin, setUserLogin} = useContext(UserContext)
    // const value = useMemo(()=> ({userLogin, setUserLogin}),[userLogin, setUserLogin])

    const characterLimit = 140;

    useEffect(() => {
        if (tweet) {
            setTweetContent(tweet.content);
            setLogIn(tweet.userName)
        }
    }, [tweet]);

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setTweetContent(event.target.value);
        }
    };

    const handleSaveClick = () => {
        if (tweetContent.trim().length > 0) {
            addTweet(tweetContent, logIn);
            setTweetContent("");
            console.log(logIn)
        }
    };

    return (
        <>
            <div className="tweet new">
                <textarea
                    rows="8"
                    cols="10"
                    placeholder="Type to add a note..."
                    value={tweetContent}
                    onChange={handleChange}
                ></textarea>
                <div className="tweet-footer">
                    <small>
                        {characterLimit - tweetContent.length} Remaining
                    </small>
                    <Toast
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={3000}
                        autohide
                        bg="info"
                    >
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                    {!showSpinner && (
                        <button className="submit" onClick={handleSaveClick}>
                            Tweet
                        </button>
                    )}
                    {showSpinner && (
                        <div className="my-spinner">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddTweet;
