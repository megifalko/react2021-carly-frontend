import {useSelector} from "react-redux";
import {AuthState} from "../store/AuthSlice";

const BASE_URL = 'http://localhost:8080';

export const getCars = async () => {
    const securityToken = useSelector((state: {auth: AuthState}) => state.auth.securityToken);

    return fetch(`${BASE_URL}/cars`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'security-header': securityToken
            }
        }).then(response => {
        if (response.ok)
        {
            return response.json()
        }
        else
        {
            throw response;
        }
    })
}
