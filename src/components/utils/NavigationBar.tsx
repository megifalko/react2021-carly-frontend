import React from "react";
import {useNavigate} from "react-router-dom";
import {RiHome2Line, RiUserLine} from "react-icons/ri";

const NavigationBar = () => {

    const navigate = useNavigate();

    return (
        <>
            <nav className="nav">
                <div className="align-left">
                    <p>
                        Carly Admin
                    </p>
                    <button>
                        Filter
                    </button>
                    <button>
                        Sort
                    </button>



                </div>
                <input />
                <button>
                    New Car
                </button>
                <div className="align-right">
                    <button>Bookings</button>
                    <RiUserLine className="icon" onClick={() => navigate("login")}/>
                </div>
            </nav>
        </>
    );
};

export default NavigationBar;
