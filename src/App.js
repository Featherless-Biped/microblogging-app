import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import React from "react";
import Feed from "./Components/Feed";
import { Link, Route, Routes } from "react-router-dom";
import SaveUserName from "././Components/SetUserName";
import TweetContextProvider from "./Components/Context/TweetContext";

const App = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Blogging App</Link>
                    </li>
                    <li>
                        <Link to="/about">UserName</Link>
                    </li>
                </ul>
            </nav>
            <TweetContextProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="container">
                                <Feed />
                            </div>
                        }
                    />
                    <Route path="/about" element={<SaveUserName />} />
                </Routes>
            </TweetContextProvider>
        </>
    );
};

export default App;
