
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../resources/logo_login.bmp"
import "../styles/login.css"
import useLogin from "../modules/useLogin";
import useAuthorization from "../modules/useAuthorization";

const Login = () => {
    const {logIn} = useLogin()
    const navigate = useNavigate();
    const auth = useAuthorization();

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const onClick = async () => {
        let res;
        setLoading(true);
        try {
            res =  await auth(loginValue, passwordValue);
        }
        catch {
            setShowError(true);
            setLoading(false);
            return;
        }

        if(res.jwttoken === "")
            setShowError(true);
        else
        {
            logIn(res.jwttoken);
            navigate("../cars");
        }
        setLoading(false);
    };

    const errMess = showError ? <p>error</p> : <></>;
    return (
        <>
            {
                loading ?
                    <p>loading</p> :
                    <form className={"login-container"}>
                        <img src={logo} className={"logo"}/>

                        <input
                            placeholder={"username"}
                            onChange={(e) => {setLoginValue(e.target.value)}}/>
                        <input
                            placeholder={"password"}
                            type={"password"}
                            onChange={(e) => {setPasswordValue(e.target.value)}}/>
                        {errMess}
                        <button
                            onClick={onClick}
                            className={"login-button"}
                            type={'button'}>
                            Log in
                        </button>
                    </form>
            }
        </>
    );
};

export default Login;
