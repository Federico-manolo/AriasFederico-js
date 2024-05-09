import Cookies from "js-cookie";

    const USER_AUTH = "user_auth";

    export const setCookieAuth = (userData)=> {
        Cookies.set(USER_AUTH, userData, {expires: 86400, sameSite: 'lax'});
    }

    export const deleteCookieAuth = () => {
        Cookies.remove(USER_AUTH);
    }

    export const isLoggedIn = () => {
        const authCookie = Cookies.get(USER_AUTH);
        return authCookie != undefined;
    }

    export const getCookieUserName = () => {
        const authCookie = Cookies.get(USER_AUTH);
        if(authCookie != undefined){
            return authCookie;
        }else{
            return "";
        }
    }