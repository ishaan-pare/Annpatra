import React, { useState } from "react";
import "../css/navbar.css";
import logo from "../../res/logo.png";
import {AiOutlineMenu} from "react-icons/ai";

//for desktop usage
const NavbarHorizontal = (props) => {
    return (
        <div className="navb" id="myNavb">
            <img href="/" src={logo} id="logo" alt="logo"/>            
            <a href='/joinus'>JoinUs</a>
            <a href='/about'>About Us</a>
            <a href='/projects'> Programs</a>
            <a className="actve" href='/'> Home</a>
            <a href="/" className="icon1" onClick={(e)=>{e.preventDefault();props.fun(1);}}>
                <AiOutlineMenu/>
            </a>
        </div>
    );
}

//for mobile application
const NavbarVerticle = (props) => {
    return (
        <div className="navbresponsive" id="myNavb">
            <h1>Ishaan</h1><br />
            <a className="actve" href='/'>Home</a>
            <a href='/about'> About</a>
            <a href='/projects' > Projects</a>
            <a href='/blogs' >Blogs</a>

            {/* <a href="javascript:void(0)" className="icon2" onClick={() => props.fun(0)}>
            </a> */}
        </div>
    );
}

function Navbar() {

    //@Navbar responsive
    //turn for orientation
    const [turn, setTurn] = useState(0);

    return (
        <>
            {turn === 0 ? (<NavbarHorizontal fun={setTurn}/>) : <NavbarVerticle fun={setTurn}/>}
        </>
    )
}

export default Navbar;