import React, { createContext, useContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import api from "../api/API";

export const TweetContext = createContext();

export function useTweetContext() {
    return useContext(TweetContext);
}

export default function TweetContextProvider({ children }) {
    const [tweets, setTweets] = useState([]);
    const [savedTweets, setSavedTweets] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
          getTweets()
          console.log(" I keep repeating myself")
        }, 5000);
        return () => clearInterval(interval);
      }, []);


    const getTweets = async () => {
        const res = await api.get("/tweet");
        console.log(res.data.tweets)
        const FetchedTweets = [...savedTweets, res.data.tweets]
        setSavedTweets(FetchedTweets);
        saveTweetsLocally()
        setTweets(FetchedTweets[0])
        console.log(tweets)
    };
    const saveTweetsLocally = () =>{
        const jsonTweets = JSON.stringify(savedTweets)
        localStorage.setItem("saved-tweets", jsonTweets)
        const str = localStorage.getItem("saved-tweets")
    }

    const [logIn, setLogIn] = useState("")
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
            const elements = [...savedTweets, response.data];
            setSavedTweets(elements);
            const jsonTweets = JSON.stringify(savedTweets)
            localStorage.setItem("saved-tweets", jsonTweets)
            const str = localStorage.getItem("saved-tweets")
            console.log(str)
            setTweets(JSON.parse(str))
            setShowSpinner(false);
            setShowToast(true);
            setToastMessage("Tweet succesfully added!");
        } catch (err) {
            console.log(`Error: ${err.response.data.message}`);
            setShowSpinner(false);
            setShowToast(true);
            setToastMessage(
                "There was problem adding your tweet, please try again!"
            );
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
