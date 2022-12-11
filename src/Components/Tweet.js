import React from "react";

const Tweet = ({ userName, id, content, date }) => {
    return (
        <div className="tweet" id={id}>
            <header className="tweetHeader">
                <h6 className="userName">Jude</h6>
                <small className="date">{date}</small>
            </header>
            <span className="content">{content}</span>
        </div>
    );
};

export default Tweet;
