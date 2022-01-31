import React, {useEffect, useState} from "react";
import "../../../styles/navbar.css";
import {RiCloseLine} from "react-icons/ri";
import {useLocation} from "react-router-dom";
import Autocomplete from "../Autocomplete";
import useCarFilters from "../../../modules/useCarFilters";
import useLogin from "../../../modules/useLogin";

interface CarsFilterProps {
    close: Function;
    submit: Function;
}

const CarsFilter = (props: CarsFilterProps) => {
    const {authToken} = useLogin();
    const {getLocationValues, getModelsValues} = useCarFilters();
    const [model, setModel] = useState("");
    const [location, setLocation] = useState("");
    const [locationTypes, setLocationTypes] = useState([]);
    const [modelTypes, setModelTypes] = useState([]);
    const submitForm = () => {
        props.submit(model, location);
        props.close();
    }

    const updateSuggestions = () => {
        try {
            getLocationValues(authToken).then((values) => {
                    setLocationTypes(values
                        .map((val: string) => val.split(',')[0])
                        .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i))
                }
            );
            getModelsValues(authToken).then(values => setModelTypes(values));
        } catch (e) {
            console.error("Unable to load suggestions ");
            console.error(e);
        }
    }

    useEffect(() => {
        updateSuggestions();
    }, [])

    return (
        <form className="flex-col flex-ac-center flex-a-start p-20 w-200">
            <button onClick={() => {
                props.close()
            }} type={'button'} className="bg-transparent btn-close">
                <RiCloseLine className="icon"/>
            </button>
            <b>Filter by...</b>
            <p>Pickup location</p>
            <Autocomplete suggestions={locationTypes} onChange={(val: string) => {
                setLocation(val)
            }}/>
            {/*<input onChange={(e) => {setLocation(e.target.value)}} className="input-border"/>*/}
            <p>Model</p>
            <Autocomplete suggestions={modelTypes} onChange={(val: string) => {
                setModel(val)
            }}/>
            {/*<input onChange={(e) => {*/}
            {/*    setModel(e.target.value)*/}
            {/*}} className="input-border"/>*/}
            <button type={"button"} onClick={submitForm}
                    className="text-white border-radius-30 w-100 h-30 s-14 m-10 bg-c2 as-center font-weight-700">
                Apply
            </button>
        </form>
    );
};

export default CarsFilter;
