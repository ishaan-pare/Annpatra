const CREG_URL = "http://localhost:5000/api/client/register";
const CLOGI_URL = "http://localhost:5000/api/client/login";
const CLOGO_URL = "http://localhost:5000/api/client/logout";
const CISA_URL = "http://localhost:5000/api/client/authenticated";

export default {
    login: async (user) => {
        return fetch(CLOGI_URL, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then(async res => {
            if (res.status !== 401) {
                return res.json().then(data => data);
            }
            else {
                return {
                    isAuthenticated: false,
                    client: {
                        cemail: "",
                        ctype: "",
                    }
                }
            }
        });
    },
    register: async (user) => {
        return fetch(CREG_URL, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout: async () => {
        return await fetch(CLOGO_URL, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: async ()=>{
        return fetch(CISA_URL, {
            method: "get",
            credentials: "include"
        }).then(res=>{
            if (res.status !== 401) {
                return res.json().then(data=>data);
            }
            else {
                return {
                    isAuthenticated: false,
                    client: {
                        cemail: "",
                        ctype: ""
                    }
                }
            }
        });
    }
}