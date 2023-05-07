const CISF = "http://localhost:5000/api/customer/checkfilled";
const CPIC = "https://api.cloudinary.com/v1_1/di91vglla/image/upload";
const CFDT = "http://localhost:5000/api/customer/form";
const CDET = "http://localhost:5000/api/customer/details";
const CDEL = "http://localhost:5000/api/customer/deletepic";
const CFRS = "http://localhost:5000/api/customer/findrest";
const CGAR = "http://localhost:5000/api/customer/getallrestaurants";

export default {
    getAllRestaurants: async ()=>{
        return await fetch(CGAR, {
            method: "get",
            credentials: "include"
        }).then(res=>res.json())
            .then(data=>data);
    },
    findRestaurant: async (params)=>{
        return await fetch(CFRS, {
            method: "post",
            credentials: "include",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res=>res.json())
            .then(data=>data);
    },
    isFilled: async () => {
        return await fetch(CISF, {
            method: "get",
            credentials: "include"
        }).then(res => res.json())
            .then(data => data);
    },
    uploadProfileImage: async (data) => {
        return await fetch(CPIC, {
            method: "post",
            body: data
        });
    },
    fillDetails: async (user) => {
        return await fetch(CFDT, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then(res => res.json())
            .then(data => data);
    },
    details: async () => {
        return await fetch(CDET, {
            method: "get",
            credentials: "include",
        }).then(res => res.json())
            .then(data => data);
    },
    deleteProfilePic: async (pic) => {
        return await fetch(CDEL, {
            method: "delete",
            body: JSON.stringify(pic),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json)
        .then(data => data);
}

}
