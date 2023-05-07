const QPRT = "http://localhost:5000/api/request/postrequest"

export default {
    postRequest: async (request)=>{
        return await fetch(QPRT, {
            method: "post",
            credentials: "include",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
            .then(data=>data);
    }
}