const RISF = "http://localhost:5000/api/restaurant/checkfilled";
const RPIC = "https://api.cloudinary.com/v1_1/di91vglla/image/upload";
const RFDT = "http://localhost:5000/api/restaurant/form";
const RDEL = "http://localhost:5000/api/restaurant/deletepic";
const RDET = "http://localhost:5000/api/restaurant/details";
const RUPD = "http://localhost:5000/api/restaurant/updatemenu";


export default {
    
    isFilled: async () => {
        return await fetch(RISF, {
            method: "get",
            credentials: "include"
        }).then(res => res.json())
            .then(data => data);
    },
    uploadProfileImage: async (data) => {
        return await fetch(RPIC, {
            method: "post",
            body: data
        });
    },
    fillDetails: async (restaurant) => {
        return await fetch(RFDT, {
            method: "post",
            body: JSON.stringify(restaurant),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then(res => res.json())
            .then(data => data);
    },
    deleteProfilePic: async (pic) => {
        return await fetch(RDEL, {
            method: "delete",
            body: JSON.stringify(pic),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json)
            .then(data => data)
    },
    details: async () => {//todo
        return await fetch(RDET, {
            method: "get",
            credentials: "include",
        }).then(res => res.json())
            .then(data => data);
    },
    updateMenu: async (rmenu) => {
        return await fetch(RUPD, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(rmenu),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    }
}