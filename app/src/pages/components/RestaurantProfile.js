import React, { useEffect, useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BiMessageError } from "react-icons/bi";

import "../css/rprofile.css";
import RestaurantService from "../../services/RestaurantService";

const EXPIRY_TIME = 36000;

function RestaurantProfile() {
    //state management 
    const [filled, setFilled] = useState(false);
    const [isadd, setIsadd] = useState(false);
    const [state, setState] = useState(0);

    //@form-menu
    const [itemstate, setItemstate] = useState(0);
    const [menu, setMenu] = useState([{ "Dal": { "name": "", "quantity": 0 }, "Rice": { "name": "", "quantity": 0 }, "Chapati": { "name": "", "quantity": 0 }, "Veggie": { "name": "", "quantity": 0 }, "Sweet": { "name": "", "quantity": 0 }, "uploaded": { "live": false, "time": 0 } }])

    //@form-profile
    const [file, setFile] = useState(null);
    const [rname, setRname] = useState("");
    const [rcon, setRcon] = useState("");
    const [rpin, setRpin] = useState("");
    const [raddr, setRaddr] = useState("");

    //@details -(todo)
    const [prof, setProf] = useState([]);//url,public_id
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [con, setCon] = useState("");
    const [pin, setPin] = useState("");
    const [addr, setAddr] = useState("");
    const [rmenu, setRmenu] = useState([{ "Dal": { "name": "", "quantity": 0 }, "Rice": { "name": "", "quantity": 0 }, "Chapati": { "name": "", "quantity": 0 }, "Veggie": { "name": "", "quantity": 0 }, "Sweet": { "name": "", "quantity": 0 }, "uploaded": { "live": false, "time": 0 } }]);
    const [menuFilled, setMenuFilled] = useState(false);

    useEffect(() => {
        var isAdded = false;
        Object.keys(menu[0]).forEach(key => {
            if (key != "uploaded")
                if (menu[0][key]["name"].length > 0) {
                    isAdded = true;
                }
        });
        if (isAdded) setIsadd(true);
        else setIsadd(false);

        var isMenuFilled = false;
        Object.keys(rmenu[0]).forEach(key => {
            if (key != "uploaded")
                if (rmenu[0][key]["name"].length > 0) {
                    isMenuFilled = true;
                }
        });
        if (isMenuFilled) setMenuFilled(true);
        else setMenuFilled(false);

        RestaurantService.isFilled().then(res => {
            if (res.response.found) {
                setFilled(true);
                RestaurantService.details().then(data => {
                    setProf([data["rphoto"][0], data["rphoto"][1]]);
                    setName(data["rname"]);
                    setCon(data["rcon"]);
                    setPin(data["rpin"]);
                    setAddr(data["raddr"]);
                    setEmail(data["cemail"]);
                    setRmenu(data["rmenu"]);
                    if (rmenu[0]["uploaded"]["live"]) {
                        if (Date.now() - rmenu[0]["uploaded"]["time"] > EXPIRY_TIME) {
                            var newExpiredMenu = {
                                "rmenu": rmenu
                            };
                            newExpiredMenu["rmenu"][0]["uploaded"]["live"] = false;
                            RestaurantService.updateMenu(newExpiredMenu);
                        }
                    }
                });
            }
            else {
                setFilled(false);
            }
        });
    });

    //@constants 
    //small components which are repetative
    //menu getting
    const MENU = ["Dal", "Rice", "Chapati", "Veggie", "Sweet"];
    const URL_r = {
        "Dal": "https://www.vegrecipesofindia.com/wp-content/uploads/2021/02/dal-fry.jpg",
        "Rice": "https://www.vegrecipesofindia.com/wp-content/uploads/2022/06/how-to-cook-basmati-rice-2.jpg",
        "Chapati": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/2_Chapati_warm_and_ready_to_be_eaten.jpg/375px-2_Chapati_warm_and_ready_to_be_eaten.jpg",
        "Veggie": "https://www.vegrecipesofindia.com/wp-content/uploads/2010/06/mix-veg-recipe-2.jpg",
        "Sweet": "https://c.recipeland.com/images/r/22063/e1f83d693f535c6923bf_1024.jpg"
    }

    //@methods
    //menu functions
    const handleOnChange = (e) => {
        if (e.target.name === "name") {
            var newMenu = menu[0];
            newMenu[MENU[itemstate - 1]]["name"] = e.target.value;
            setMenu([newMenu]);
        }
        else if (e.target.name === "quantity") {
            var newMenu = menu[0];
            newMenu[MENU[itemstate - 1]]["quantity"] = e.target.value;
            setMenu([newMenu]);
        }
    }
    const changeItemStatePrev = (e) => {
        setItemstate(itemstate - 1);
    }
    const changeItemStateNext = (e) => {
        setItemstate(itemstate + 1);
    }
    const handleSwitch = (e) => {
        if (state === 1) {
            setState(0);
            document.getElementsByClassName("rprofile-btn-left")[0].className = "rprofile-btn-leftm";
            document.getElementsByClassName("rprofile-btn-rightm")[0].className = "rprofile-btn-right";
        }
        else if (state === 0) {
            setState(1);
            document.getElementsByClassName("rprofile-btn-right")[0].className = "rprofile-btn-rightm";
            document.getElementsByClassName("rprofile-btn-leftm")[0].className = "rprofile-btn-left";
        }
    }

    const onMenuSubmit = (e) => {
        if (filled) {
            let menu_l = menu;
            menu_l[0]["uploaded"]["time"] = Date.now();
            menu_l[0]["uploaded"]["live"] = true;

            const newMenu = {
                "rmenu": menu_l
            }
            RestaurantService.updateMenu(newMenu);
            setMenu([{ "Dal": { "name": "", "quantity": 0 }, "Rice": { "name": "", "quantity": 0 }, "Chapati": { "name": "", "quantity": 0 }, "Veggie": { "name": "", "quantity": 0 }, "Sweet": { "name": "", "quantity": 0 }, "uploaded": { "live": false, "time": 0 } }]);
            setItemstate(0);
        }
        else {
            alert("Profile incomplete");
        }
    }

    //profile functions
    const onProfileSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "annapatra_users");
        formData.append("cloud_name", "di91vglla");

        RestaurantService.uploadProfileImage(formData).then(res => res.json()).then(data => {
            const newUser = {
                "rname": rname,
                "rphoto": [data.url, data.public_id],
                "rcon": rcon,
                "rpin": rpin,
                "raddr": raddr,
            }

            RestaurantService.deleteProfilePic({ "url": prof[0], "public_id": prof[1] }).then(res => {
            });

            RestaurantService.fillDetails(newUser);
        })
    }
    const onProfileChange = (e) => {
        if (e.target.name === "rphoto") {
            document.getElementById("prof-r").src = URL.createObjectURL(e.target.files[0]);
            setFile(e.target.files[0]);
        }
        else if (e.target.name === "rname") {
            setRname(e.target.value);
        }
        else if (e.target.name === "rcon") {
            setRcon(e.target.value);
        }
        else if (e.target.name === "rpin") {
            setRpin(e.target.value);
        }
        else if (e.target.name === "raddr") {
            setRaddr(e.target.value);
        }

    }

    //rep components
    const FoodItem = (props) => {
        if (menu[0][props.type]["name"].length > 0) {
            return (
                <div className="figetitem-mid">
                    <div className="figetitem-mid-img">
                        <img src={URL_r[props.type]} />
                    </div>
                    <div className="figetitem-mid-details">
                        <div className="figetitem-details-cat">
                            <span style={{ fontWeight: 400 }}>Category</span> : {props.type}
                        </div>
                        <div className="figetitem-details-name">
                            <span style={{ fontWeight: 400 }}>Name</span> : {menu[0][props.type]["name"]}
                        </div>
                        <div className="figetitem-details-quantity">
                            <span style={{ fontWeight: 400 }}>Quantity</span> : {menu[0][props.type]["quantity"]}
                        </div>
                    </div>
                </div>
            );
        }
        else {

        }
    }

    const LiveFoodItem = (props) => {
        if (rmenu[0][props.type]["name"].length > 0) {
            return (
                <div className="lfigetitem-mid">
                    <div className="figetitem-mid-img">
                        <img src={URL_r[props.type]} />
                    </div>
                    <div className="lfigetitem-mid-details">
                        <div className="lfigetitem-details-cat">
                            {props.type}
                        </div>
                        <div className="lfigetitem-details-name">
                            {rmenu[0][props.type]["name"]}
                        </div>
                        <div className="lfigetitem-details-quantity">
                            {rmenu[0][props.type]["quantity"]}
                        </div>
                    </div>
                </div>
            );
        }
        else {

        }
    }
    return (

        state === 0 ? (<div className="rprofile">
            <div className="rprofile-up">

                <div className="rprofile-up-btn">
                    <div className="rprofile-btn-leftm" onClick={handleSwitch}>
                        Profile
                    </div>
                    <div className="rprofile-btn-right" onClick={handleSwitch}>
                        Menu
                    </div>
                </div>
            </div>
            <div className="rprofile-down">
                <div className="rprofile-down-left">
                    {
                        filled ? (
                            <>
                                <div className="rprofile-left-img">
                                    <img src={prof[0]} />
                                </div>
                                <div className="rprofile-left-rname">
                                    Name: {name}
                                </div>
                                <div className="rprofile-left-remail">
                                    Email: {email}
                                </div>
                                <div className="rprofile-left-rcon">
                                    Contact: {con}
                                </div>
                                <div className="rprofile-left-rpin">
                                    PIN: {pin}
                                </div>
                                <div className="rprofile-left-raddr">
                                    Address: {addr}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="rprofile-left-false">
                                    <img src="https://cdn.pixabay.com/photo/2013/07/12/13/58/warning-147699_960_720.png" />
                                </div>
                                <div className="rprofile-left-msg">
                                    Profile not updated
                                </div>
                                <div className="rprofile-left-ind">
                                    <BsFillArrowRightCircleFill size={40} />
                                </div>
                            </>

                        )
                    }
                </div>
                <div className="rprofile-down-right">
                    <div className="rprofile-right-img">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" id="prof-r" />
                        <input type="file" name="rphoto" onChange={onProfileChange} />
                    </div>
                    <div className="rprofile-right-rname">
                        <input type="text" name="rname" placeholder="Restaurant Name" onChange={onProfileChange} />
                    </div>
                    <div className="rprofile-right-rcon">
                        <input type="text" name="rcon" placeholder="Contact Number" onChange={onProfileChange} />
                    </div>
                    <div className="rprofile-right-rpin">
                        <input type="text" name="rpin" placeholder="PIN" onChange={onProfileChange} />
                    </div>
                    <div className="rprofile-right-raddr">
                        <input type="text" name="raddr" placeholder="Address" onChange={onProfileChange} />
                    </div>
                    <div className="rprofile-right-submit">
                        <button onClick={onProfileSubmit}>Update</button>
                    </div>
                </div>
            </div>
        </div>) : (
            <div className="rprofile">
                <div className="rprofile-up">
                    <div className="rprofile-up-btn">
                        <div className="rprofile-btn-leftm" onClick={handleSwitch}>
                            Profile
                        </div>
                        <div className="rprofile-btn-right" onClick={handleSwitch}>
                            Menu
                        </div>
                    </div>
                </div>
                <div className="rprofile-menu">
                    <div className="rprofile-menu-left">
                        {
                            !isadd ?
                                <>
                                    {
                                        rmenu[0]["uploaded"]["time"] === 0 ?
                                            <>
                                                <div className="rprofile-menu-left-img">
                                                    <img src="https://cdn.pixabay.com/photo/2014/04/02/10/44/warning-sign-304370_960_720.png" />
                                                </div>
                                                <div className="rprofile-menu-left-msg">
                                                    No Item Added
                                                </div>
                                            </> :
                                            <>
                                                {
                                                    rmenu[0]["uploaded"]["live"] ?
                                                        <>
                                                            <div className="rprofile-menu-left-img">
                                                                <img src="https://cdn.pixabay.com/photo/2016/10/10/01/49/hook-1727484_960_720.png" />
                                                            </div>
                                                            <div className="rprofile-menu-left-msg">
                                                                Menu is Live
                                                            </div>
                                                        </> :
                                                        <>
                                                            <div className="rprofile-menu-left-img">
                                                                <img src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png" />
                                                            </div>
                                                            <div className="rprofile-menu-left-msg">
                                                                Menu expired
                                                            </div>
                                                        </>
                                                }
                                            </>
                                    }
                                </> :
                                <>
                                    <div className="figetitem-header">Items</div>
                                    <FoodItem type="Dal" />
                                    <FoodItem type="Rice" />
                                    <FoodItem type="Chapati" />
                                    <FoodItem type="Veggie" />
                                    <FoodItem type="Sweet" />
                                    <div className="figetitem-next">
                                        <button onClick={onMenuSubmit}>Confirm</button>
                                    </div>
                                </>

                        }
                    </div>
                    <div className="rprofile-menu-right">
                        <div className="rprofile-menu-right-up">
                            {
                                itemstate === 0 ?
                                    <>
                                        <div className="rprofile-upmenu-up">
                                            Click update to add food Items.

                                        </div>
                                        <div className="rprofile-upmenu-down">
                                            <button onClick={() => setItemstate(itemstate + 1)}>Update</button>
                                        </div>
                                    </> : itemstate < 6 ?
                                        <>
                                            <div className="getitem-header">
                                                {itemstate}/5
                                            </div>
                                            <div className="getitem-mid">
                                                <div className="getitem-mid-img">
                                                    <img src={URL_r[MENU[itemstate - 1]]} />
                                                </div>
                                                <div className="getitem-mid-details">
                                                    <div className="getitem-details-cat">
                                                        Category : {MENU[itemstate - 1]}
                                                    </div>
                                                    <div className="getitem-details-name">
                                                        <input value={menu[0][MENU[itemstate - 1]]["name"]} name="name" type="text" placeholder="General Name" onChange={handleOnChange} />
                                                    </div>
                                                    <div className="getitem-details-quantity">
                                                        <input value={menu[0][MENU[itemstate - 1]]["quantity"]} name="quantity" type="number" onChange={handleOnChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="getitem-next">
                                                <button onClick={changeItemStateNext}>Next</button>
                                                <button onClick={changeItemStatePrev}>Prev</button>

                                            </div>
                                        </> : <h1>Completed</h1>
                            }
                        </div>
                        <div className="rprofile-menu-right-down">
                            {
                                !rmenu[0]["uploaded"]["live"] ?
                                    <div className="rprofile-downmenu-exp">
                                        {
                                            menuFilled ?
                                                <>
                                                    <BiMessageError color="orange" size={40} /><br />
                                                    Dear Annapatra users, <br /><br />

                                                    Your menu is expired,<br />
                                                    For everyone's safety please dicompose your food!<br /><br />
                                                    You can add new menu as per your convenience.<br />
                                                    And keep helping us to make this country hunger free.
                                                </> :
                                                <>
                                                    <span style={{ fontSize: "15px" }}>Once you confirm and submit your menu it will be shown here.</span>
                                                </>
                                        }
                                    </div> :
                                    <>
                                        <div className="rprofile-menu-meta">
                                            Expiring in : <span style={{ color: "red" }}>{Math.floor((EXPIRY_TIME - (Date.now() - rmenu[0]["uploaded"]["time"])) / 60000) + " min  " + Math.floor(((EXPIRY_TIME - (Date.now() - rmenu[0]["uploaded"]["time"])) % 60000)/1000) + " sec"}</span>
                                        </div>
                                        <div className="rprofile-downmenu-live">
                                            <LiveFoodItem type="Dal" />
                                            <LiveFoodItem type="Rice" />
                                            <LiveFoodItem type="Chapati" />
                                            <LiveFoodItem type="Veggie" />
                                            <LiveFoodItem type="Sweet" />
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default RestaurantProfile;