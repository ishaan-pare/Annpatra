import React, { useEffect, useState } from "react";

import "../css/cprofile.css";
import CustomerService from "../../services/CustomerService";

function CustomerProfile() {

    const [filled, setFilled] = useState(false);

    //@hooks->form
    //use these to set the form value of customer profile
    const [file, setFile] = useState(null);
    const [cname, setCname] = useState("");
    const [ccon, setCcon] = useState("");
    const [isorg, setIsorg] = useState(null);

    //@hooks->details
    //use these values to display the account details
    const [prof, setProf] = useState([]);//url,public_id
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [con, setCon] = useState("");
    const [org, setOrg] = useState(null);

    //useEffect for logic building
    useEffect(() => {
        
        CustomerService.isFilled().then(res => {
            if (res.response.found) {
                setFilled(true);
                CustomerService.details().then(data=>{
                    setProf([data["cphoto"][0],data["cphoto"][1]]);
                    setName(data["cname"]);
                    setEmail(data["cemail"]);
                    setCon(data["ccon"]);
                    setOrg(data["isorg"]);
                })
            }
            else {
                setFilled(false);
            }
        });

    });
    
    //onchange form variables
    const onChange = (e) => {
        if (e.target.name === "file") {
            document.getElementById("prof-e").src = URL.createObjectURL(e.target.files[0]);
            setFile(e.target.files[0]);
        }
        else if (e.target.name === "cname") {
            setCname(e.target.value);
        }
        else if (e.target.name === "ccon") {
            setCcon(e.target.value);
        }
        else if (e.target.name === "isorg") {
           
            setIsorg(e.target.checked);
        }

    }
    //onsubmit form 
    const onSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "annapatra_users");
        formData.append("cloud_name", "di91vglla");

        CustomerService.uploadProfileImage(formData).then(res=>res.json()).then(data=>{
            const newUser = {
                "cname": cname,
                "ccon": ccon,
                "cphoto": [data.url,data.public_id],
                "isorg": isorg
            } 
            CustomerService.deleteProfilePic({"url": prof[0], "public_id": prof[1]}).then(res=>{
                document.getElementById("prof-e").src = "";
            });
            CustomerService.fillDetails(newUser);
        });


    }

    return (
        <div className="cprofile">
            <div className="cprofile-upper">
                <div className="cprofile-upper-left">
                    {
                        filled ?
                            <>
                                <div className="cprofile-left-up">
                                    <img src={prof[0]} id="prof" alt="profile" />
                                </div>
                                <div className="cprofile-left-down">
                                    <p className="cspan"><span style={{fontWeight: 500, fontSize: "15px"}}> &emsp;Name :  &emsp;</span>{name}</p>
                                    <p className="cspan"><span style={{fontWeight: 500, fontSize: "15px"}}> &emsp;Email :  &emsp;</span> {email }</p>
                                    <p className="cspan"><span style={{fontWeight: 500, fontSize: "15px"}}> &emsp;Contact :  &emsp;</span>  {con }</p>
                                    <p className="cspan"><span style={{fontWeight: 500, fontSize: "15px"}}> &emsp;Organisation :  &emsp;</span>  {org?"Yes":"No"}</p>
                                    <br />
                                    <br />
                                    <p className="cspan1">Status : Approved</p>
                                </div>
                            </> : <div><p className="cspan2">Status : Not Updated</p></div>

                    }
                </div>
                <div className="cprofile-upper-right">
                <div className="cprofile-upper-inner">
                    <div className="cprofile-right-up">
                        <label>
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" id="prof-e" />
                        </label>
                        <input type="file" name="file" onChange={onChange} />

                    </div>
                    <div className="cprofile-right-down">
                        <input type="text" name="cname" placeholder="Enter your name" onChange={onChange} /><br />
                        <input type="text" name="ccon" placeholder="Enter your contact" onChange={onChange} /><br />
                        <label>
                            <input id="check" type="checkbox" name="isorg" onChange={onChange} />
                            Are you a part of NGO?
                        </label><br />
                        <button name="Edit" value="Update" onClick={onSubmit}>Update</button>
                    </div>
                </div>
                </div>
            </div>
            <div className="cprofile-lower">

            </div>
        </div>
    );
}

export default CustomerProfile;