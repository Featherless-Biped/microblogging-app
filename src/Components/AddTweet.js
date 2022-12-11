import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";

const AddTweet = ({
    handleAddTweet,
    tweet,
    showSpinner,
    showToast,
    setShowToast,
    toastMessage,
}) => {
    const [tweetContent, setTweetContent] = useState("");

    const characterLimit = 140;

    useEffect(() => {
        if (tweet) {
            setTweetContent(tweet.content);
        }
    }, [tweet]);

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setTweetContent(event.target.value);
        }
    };

    const handleSaveClick = () => {
        if (tweetContent.trim().length > 0) {
            handleAddTweet(tweetContent);
            setTweetContent("");
        }
    };

    return (
        <div className="tweet new">
            <textarea
                rows="8"
                cols="10"
                placeholder="Type to add a note..."
                value={tweetContent}
                onChange={handleChange}
            ></textarea>
            <div className="tweet-footer">
                <small>{characterLimit - tweetContent.length} Remaining</small>
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
    );
};

export default AddTweet;
