import axios from "axios";

const url = axios.create({
    // baseURL: "https://fashionkartnodeserver.azurewebsites.net/api/v4/",
    baseURL: "http://localhost:8000/api/v4/",
    withCredentials: true,
});

export default url;