import React, { useContext, useState } from "react";
import "../css/navbar.css";
import logo from "../../res/logo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { ClientContext } from "../../context/ClientContext";
import ClientService from "../../services/ClientService";
import { useNavigate } from "react-router-dom";

//for desktop usage
const NavbarHorizontal = (props) => {
    return (
        <div className="navb" id="myNavb">
            <a href='/joinus'>JoinUs</a>
            <a href='/about'>About Us</a>
            <a href='/projects'> Programs</a>
            <a className="actve" href='/'> Home</a>
            <a href="/" className="icon1" onClick={(e) => { e.preventDefault(); props.fun(1); }}>
                <AiOutlineMenu />
            </a>
            <a id="icon" href='/joinus'>AnnPatra</a>

        </div>
    );
}
//for desktop usage for loged in users
const NavbarHorizontalLogedIn = (props) => {
    return (
        <div className="navb" id="myNavb">
            <a id="logout-btn" href='/' onClick={() => props.out()}> Logout</a>
            <a href='/dashboard'> Dashboard</a>
            <a href="/requests">Requests</a>
            <a className="actve" href='/profile'>Profile</a>
            <a href="/" className="icon1" onClick={(e) => { e.preventDefault(); props.fun(1); }}>
                <AiOutlineMenu />
            </a>
            <a id="icon" href='/joinus'>AnnPatra</a>
        </div>
    );
}

//for mobile application
const NavbarVerticle = (props) => {
    return (
        <div className="navbresponsive" id="myNavb">
            <h1>Annpatra</h1><br />
            <a className="actve" href='/'>Home</a>
            <a href='/about'> About</a>
            <a href='/projects' > Projects</a>
            <a href='/blogs' >Blogs</a>

            {/* <a href="javascript:void(0)" className="icon2" onClick={() => props.fun(0)}>
            </a> */}
        </div>
    );
}

//for mobile application
const NavbarVerticleLogedIn = (props) => {
    return (
        <div className="navbresponsive" id="myNavb">
            <h1>Annpatra</h1><br />
            <a className="actve" href='/'>Profile</a>
            <a href='/about'> DashBoard</a>
            <a href='/' onClick={() => ClientService.logout()}> Logout</a>
            {/* <a href="javascript:void(0)" className="icon2" onClick={() => props.fun(0)}>
            </a> */}
        </div>
    );
}

function Navbar() {

    //@Navbar responsive
    //turn for orientation
    const [turn, setTurn] = useState(0);

    const clientContext = useContext(ClientContext);
    const navigate = useNavigate();
    const logout = () => {
        ClientService.logout();
        navigate("/");
    }

    return (
        <>
            {turn === 0 ? (

                clientContext.isAuthenticated ?
                    <div className="navb" id="myNavb">
                        <a id="logout-btn" href='/' onClick={logout}> Logout</a>
                        {
                            clientContext.user["ctype"] === "customer" ?
                                <a href='/dashboard'> Dashboard</a> : <></>
                        }
                        <a href="/requests">Requests</a>
                        <a className="actve" href='/profile'>Profile</a>
                        <a href="/" className="icon1" onClick={(e) => { e.preventDefault(); setTurn(1); }}>
                            <AiOutlineMenu />
                        </a>
                        <a id="icon" href='/joinus'>AnnPatra</a>
                    </div>
                    :
                    <NavbarHorizontal fun={setTurn} />
            ) : (

                clientContext.isAuthenticated ?
                    <NavbarVerticleLogedIn fun={setTurn} />
                    :
                    <NavbarVerticle fun={setTurn} />
            )}
        </>
    )
}

export default Navbar;