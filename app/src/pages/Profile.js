import React, { useContext } from "react";
import { ClientContext } from "../context/ClientContext";

import CustomerProfile from "./components/CustomerProfile";
import RestaurantProfile from "./components/RestaurantProfile";


function Profile() {
    const clientContext = useContext(ClientContext);

    return (
        <div>
            {
                clientContext.isAuthenticated ?
                    (
                        clientContext.user["ctype"] === "restaurant" ? <RestaurantProfile /> : <CustomerProfile />
                    ) : <h1>Unauthorized</h1>
            }
        </div>
    );
}
export default Profile;