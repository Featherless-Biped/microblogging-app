import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/API";

export const TweetContext = createContext();

export function useTweetContext() {
    return useContext(TweetContext);
}

export default function TweetContextProvider({ children }) {
    const [tweets, setTweets] = useState([]);

    const getTweets = async () => {
        const res = await api.get("/tweet");
        setTweets(res.data.tweets);
    };
    const [logIn, setLogIn] = useState("jack")
    const [showSpinner, setShowSpinner] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    
    
    const addTweet = async (content) => {
        const element = {
            content: content,
            userName: logIn,
            date: new Date(),
        };

        try {
            setShowSpinner(true);
            const response = await api.post("/tweet", element);
            const elements = [...tweets, response.data];
            setTweets(elements);
            setShowSpinner(false);
            setShowToast(true);
            setToastMessage("Tweet succesfully added!");
        } catch (err) {
            console.log(`Error: ${err.response.data.message}`);
            setShowSpinner(false);
            setShowToast(true);
            // setToastMessage(
            //     "There was problem adding your tweet, please try again!"
            // );
            setToastMessage(err.response.data.message);
        }
    };

    return (
        <TweetContext.Provider
            value={{
                addTweet,
                showSpinner,
                showToast,
                toastMessage,
                getTweets,
                setShowSpinner,
                setShowToast,
                setToastMessage,
                tweets,
                logIn,
                setLogIn
            }}
        >
            {children}
        </TweetContext.Provider>
    );
}
