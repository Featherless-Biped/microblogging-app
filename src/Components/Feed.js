import Tweet from "./Tweet";
import AddTweet from "./AddTweet";

const Feed = ({
    tweets,
    handleAddTweet,
    showSpinner,
    showToast,
    setShowToast,
    toastMessage,
}) => {
    return (
        <div className="feed">
            <AddTweet
                handleAddTweet={handleAddTweet}
                showSpinner={showSpinner}
                showToast={showToast}
                setShowToast={setShowToast}
                toastMessage={toastMessage}
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
