import {redirect} from "react-router-dom";
import Cookies from "js-cookie";

export const checkAuthLoader = () => {
    const token = Cookies.get("tk");
    if(!token){
        window.location.reload();
        return redirect("/");
    }
    return true;
};