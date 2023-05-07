import React, { createContext, useState, useEffect } from "react";
import ClientService from "../services/ClientService";

export const ClientContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        ClientService.isAuthenticated().then(data => {
            setUser(data.client);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        })
    }, []);

    return (
        <div>
            {
                !isLoaded ? <h1>Loading</h1> :
                    <ClientContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                        {children}
                    </ClientContext.Provider>
            }
        </div>
    )
}