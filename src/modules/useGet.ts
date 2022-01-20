import {useNavigate} from "react-router-dom";

export default function(currPath: string) {

    const updateParam = (name: string, value:string, query: URLSearchParams) => {
        if(value !== "")
            query.set(name, value);
        else
            query.delete(name);
    }

    const refreshPath = (navigate: Function, query: URLSearchParams) => {
        let newURL: string = "";
        query.forEach((value: string, key: string) => {
            newURL += "&" + key +  "=" + value;
        });
        const joined = currPath + "?" + newURL.slice(1);
        navigate(joined);
    }

    return {updateParam, refreshPath};
}