import Tweet from "./Tweet";
import { useContext, useEffect } from "react";
import AddTweet from "./AddTweet";
import {useTweetContext} from "./Context/TweetContext";

const Feed = () => {
    const { tweets, getTweets } = useTweetContext();
    const { showSpinner, setShowSpinner } = useTweetContext();
    const { showToast, setShowToast } = useTweetContext();
    const { toastMessage, setToastMessage } = useTweetContext();
    const { addTweet } = useTweetContext();

    useEffect(() => {
        async function renderTweets() {
            await getTweets();
        }
        renderTweets();
    }, []);

    return (
        <div className="feed">
            <AddTweet
                handleAddTweet={addTweet}
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
                showToast={showToast}
                setShowToast={setShowToast}
                toastMessage={toastMessage}
                setToastMessage={setToastMessage}
            />
            {tweets.map((tweet) => (
                <div>
                    <Tweet
                        key={tweet.id}
                        id={tweet.id}
                        userName={tweet.userName}
                        content={tweet.content}
                        date={tweet.date}
                    />
                </div>
            ))}
        </div>
    );
};

export default Feed;
