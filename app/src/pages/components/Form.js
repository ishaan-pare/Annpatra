import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/form.css";
import Message from "./Message";
import ClientService from "../../services/ClientService";
import { ClientContext } from "../../context/ClientContext";



function Form() {
    //@hooks
    //option = [register or login] 
    //0 for login and 1 for register
    const [option, setOption] = useState(1);
    const [message, setMessage] = useState(null);
    const [msgcode, setMsgCode] = useState(0);
    const clientContext = useContext(ClientContext);


    let timerId = useRef(null);
    const navigate = useNavigate();

    //@Register hooks
    const [cemail, setCemail] = useState("");
    const [cpass, setCpass] = useState("");
    const [crpass, setCrpass] = useState("");
    const [ctype, setCtype] = useState("");


    //@Login hooks
    const [l_cemail, setL_cemail] = useState("");
    const [l_cpass, setL_cpass] = useState("");

    //@form control and functions
    //form state control
    const changeFormState = () => {
        if (option === 0) {
            setOption(1);
            document.getElementsByClassName("form-options-login")[0].className = "form-options-loginp";
            document.getElementsByClassName("form-options-registerp")[0].className = "form-options-register";

        }
        else {
            setOption(0);
            document.getElementsByClassName("form-options-loginp")[0].className = "form-options-login";
            document.getElementsByClassName("form-options-register")[0].className = "form-options-registerp";

        }
    }
    //email checker 
    function isValidEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    }
    //password checker
    function isSamePass(pass, rpass) {
        if (pass === rpass) {
            return true;
        }
        return false;
    }
    function isValidPass(pass) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(pass);
    }
    //form resetter
    const resetForm = () => {
        setCemail("");
        setCpass("");
        setCrpass("");
        setCtype("");
    }

    //@Registration control
    //registration form change handling
    const onHandleChange = (e) => {
        if (e.target.value === "restaurant") {
            setCtype(e.target.value);
            document.getElementById("rd2").checked = false;
        }
        else if (e.target.value === "customer") {
            setCtype(e.target.value);
            document.getElementById("rd1").checked = false;
        }
        if (e.target.name === "cemail") {
            setCemail(e.target.value)
        }
        else if (e.target.name === "cpass") {
            setCpass(e.target.value);
        }
        else if (e.target.name === "crpass") {
            setCrpass(e.target.value);
        }
    }

    //submitting registration form
    const onSubmit = (e) => {
        e.preventDefault();

        if (!isValidEmail(cemail)) {
            setMessage("Email is not Valid");
            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
        else if (!isSamePass(cpass, crpass)) {
            setMessage("Password not same");
            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
        else if (!isValidPass(cpass)) {
            setMessage("Password is not valid");
            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
        else {
            const newClient = {
                "cemail": cemail,
                "cpass": cpass,
                "ctype": ctype
            }
            ClientService.register(newClient)
                .then(data => {
                    const { message } = data;
                    resetForm();

                    if (!message.msgError) {
                        setMsgCode(1);
                        setMessage(message.msgBody);
                        timerId = setTimeout(() => {
                            navigate("/login");
                        }, 2000);
                    }
                    else {
                        setMsgCode(0);
                        setMessage(message.msgBody);
                        timerId = setTimeout(() => {
                            navigate("/aboutus");
                        }, 2000)
                    }
                })
        }
    }

    //@login control
    //login form change handling
    const onChange = (e) => {
        e.preventDefault();

        if (e.target.name === "l_cemail") {
            setL_cemail(e.target.value);
        }
        else if (e.target.name === "l_cpass") {
            setL_cpass(e.target.value);

        }
    }
    //login form submmision
    const onLogin = (e) => {
        e.preventDefault();


        if (l_cemail.length === 0) {
            setMessage("Please enter email id");
        }
        else if (l_cpass.length === 0) {
            setMessage("please enter password");
        }
        else {
            const newUser = {
                "username": l_cemail,
                "password": l_cpass
            }
            ClientService.login(newUser)
                .then(data => {
                    const { isAuthenticated, client, message } = data;
                    if (isAuthenticated) {
                        clientContext.setUser(client);
                        clientContext.setIsAuthenticated(isAuthenticated);
                        if (client["ctype"] === "customer")
                            navigate("/dashboard");
                        else
                            navigate("/request");
                    }
                    else {
                        setMessage("Incorrect password and email combination");
                        setTimeout(() => {
                            setMessage("");
                        }, 2000);
                    }
                });
        }

    }


    return (
        <div className="form">
            <div className="form-options">
                <div className="form-options-login" onClick={changeFormState}>
                    Login
                </div>
                <div className="form-options-registerp" onClick={changeFormState}>
                    Register
                </div>
            </div>
            {
                (option === 1) ?

                    (

                        <div className="form-fill">
                            <input name="l_cemail" type="email" placeholder="E-mail" onChange={onChange} /><br />
                            <input name="l_cpass" type="password" placeholder="Password" onChange={onChange} /><br />
                            <span className="form-fill-fp">Forget Password?</span><br />
                            <button type="button" onClick={onLogin}>Login</button>
                        </div>

                    ) : (

                        <div className="form-fill">
                            <input name="cemail" type="email" placeholder="E-mail" onChange={onHandleChange} /><br />
                            <input name="cpass" type="password" placeholder="Password" onChange={onHandleChange} /><br />
                            <input name="crpass" type="password" placeholder="Password" onChange={onHandleChange} /><br />
                            <div className="radiobtn">
                                <label>
                                    <input type="radio" value="restaurant" id="rd1" onChange={onHandleChange} />
                                    Restaurant
                                </label>
                                <label>
                                    <input type="radio" value="customer" id="rd2" onChange={onHandleChange} />
                                    Customer
                                </label>


                            </div>
                            <span className="form-fill-fp">Forget Password?</span><br />
                            <button type="button" onClick={onSubmit}>Register</button>
                        </div>

                    )
            }
            <div className="form-resp">
                <Message text={message} msgcode={msgcode} />
            </div>
        </div>
    );
}
export default Form;