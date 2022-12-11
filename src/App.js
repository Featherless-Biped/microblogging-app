import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import Feed from "./Components/Feed";
import api from "./Components/api/API";
import { Link, Route, Routes } from "react-router-dom";
import SaveUserName from "./Components/SetUserName";

const App = () => {
    const [tweets, setTweets] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const getTweets = () => {
        api.get("/tweet").then((data) => {
            setTweets(data.data.tweets);
        });
    };

    useEffect(() => {
        getTweets();
    }, []);
    // const AddUserName = (userName) =>{
    //     const element = {
    //         userName: {userName}
    //     }
    // }

    const AddTweet = async (content) => {
        const element = {
            content: content,
            userName: "Jude",
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
        <>
            <nav>
                <ul>
                    <il>
                        <Link to="/">Blogging App</Link>
                    </il>
                    <il>
                        <Link to="/about">UserName</Link>
                    </il>
                </ul>
            </nav>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="container">
                            <Feed
                                tweets={tweets}
                                handleAddTweet={AddTweet}
                                showSpinner={showSpinner}
                                showToast={showToast}
                                setShowToast={setShowToast}
                                toastMessage={toastMessage}
                            />
                        </div>
                    }
                />
                <Route path="/about" element={<SaveUserName />} />
            </Routes>
        </>
    );
};

export default App;
