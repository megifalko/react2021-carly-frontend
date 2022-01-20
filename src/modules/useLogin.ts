import {useDispatch, useSelector} from "react-redux";
import {AuthState, login, logout} from "../store/AuthSlice";

export default function() {
    const isLoggedStorage = localStorage.getItem("logged") === "true";
    const authTokenStorage = localStorage.getItem("token");

    const LoginStorage = (token: string) => {
        localStorage.setItem("logged", "true");
        localStorage.setItem("token", token);
    }

    const LogoutStorage = () => {
        localStorage.setItem("logged", "false");
        localStorage.setItem("token", "");
    }

    const isLoggedRedux = useSelector((state: {auth: AuthState}) => state.auth.isLoggedIn);
    const authTokenRedux = useSelector((state: {auth: AuthState}) => state.auth.securityToken);

    const dispatch = useDispatch();

    const LoginRedux = () => {
        dispatch(login());
    }

    const LogoutRedux = () => {
        dispatch(logout());
    }

    const storageAvailable = () => {
        try {
            let x = '__storage_test__';
            localStorage.setItem(x, x);
            localStorage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED');
        }
    }
    let isLoggedIn : boolean;
    let authToken : string;
    let logIn : Function;
    let logOut: Function;

    if(storageAvailable())
    {
         isLoggedIn = isLoggedStorage;
         authToken = authTokenStorage ?? "";
         logIn = LoginStorage;
         logOut = LogoutStorage;

    }
    else {
        isLoggedIn = isLoggedRedux;
        authToken = authTokenRedux ?? "";
        logIn = LoginRedux;
        logOut = LogoutRedux;
    }

    return {isLoggedIn, authToken, logIn, logOut};
}