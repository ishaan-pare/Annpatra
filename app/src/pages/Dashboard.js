import React, { useContext } from "react";
import {ClientContext} from "../context/ClientContext";
import Search from "./components/Search";

function DashBoard() {

    const clientContext = useContext(ClientContext);
    return (
        <div>
            {
                clientContext.isAuthenticated?(
                        clientContext.user["ctype"] !== "restaurant" ? <Search/> : <></>
                    ) : <h1>Unauthorized</h1>
            }
        </div>
    );
}

export default DashBoard;