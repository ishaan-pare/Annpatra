import React, { useContext } from "react";
import Form from "./components/Form";

import "./css/home.css";
import logo from "../res/logo.png";
import { ClientContext } from "../context/ClientContext";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const clientContext = useContext(ClientContext);
    const navigate = useNavigate();
    return (
        <>
            {
                clientContext.isAuthenticated ? (<h1></h1>) : (<div className="home">
                    <div className="home-left">
                        <img src={logo} />
                    </div>
                    <div className="home-right">
                        <Form />
                    </div>
                </div>)
            }
        </>

    );
}

export default Home;