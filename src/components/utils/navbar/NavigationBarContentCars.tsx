import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/navbar.css";
import { RiArrowDropDownFill, RiSearchLine, RiUserLine } from "react-icons/ri";
import CarsSort from "./CarsSort";
import NewCarPlaceholder from "./NewCarPlaceholder";
import useGet from "../../../modules/useGet";
import useLogin from "../../../modules/useLogin";
import Dropdown from "../Dropdown";
import CarsFilter from "./CarsFilter";
import CarEditor from "../../car/CarEditor";
import PureModal from "react-pure-modal";
import {Car} from "../../../objects/Car";
import {addCar, uploadImage} from "../../../logic/api";
import {HiOutlinePlusSm} from 'react-icons/hi'
import {IoIosArrowForward} from 'react-icons/io'
import {IoCloseOutline} from 'react-icons/io5'

const NavigationBar = () => {
  const query = new URLSearchParams(useLocation().search);

  const navigate = useNavigate();
  const { updateParam, refreshPath } = useGet("cars");
  const { logOut, authToken } = useLogin();
  const [newCarVisible, setNewCarVisible] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState(
    query.has("search") ? query.get("search") : ""
  );

  const submitFilters = (model: string, location: string) => {
    updateParam("model", model, query);
    updateParam("location", location, query);
    refreshPath(navigate, query);
  };

  const search = () => {
    updateParam("search_text", searchPhrase ?? "", query);
    refreshPath(navigate, query);
  };

  const submitSort = (criterion: string, direction: string) => {
    updateParam(criterion + "_sort", direction, query);
    refreshPath(navigate, query);
  };

  const handleSaveNew = (car: Car, uploadedImages: File[]) => {
    addCar(car, authToken)
        .catch((e) => {
          console.error("Error during adding the car\n" + JSON.stringify(e));
        })
        .then((id) => {
          Promise.all(
              uploadedImages.map((img) => uploadImage(id, img, authToken))
          ).catch((e) => {
            console.error("Error during uploading image\n" + JSON.stringify(e));
          });
        })
        .finally(() => {
          navigate("/cars");
        });
  };

  const closeNewCar = () => {
    setNewCarVisible(false);
  };
  return (
    <>
      <div className="nav-content">
        <div className={"flex-row pl-90"}>
          <Dropdown
            content={(close: Function) => {
              return <CarsFilter close={close} submit={submitFilters} />;
            }}
            name={"Filter"}
          />
          <Dropdown
            content={(close: Function) => {
              return <CarsSort close={close} submit={submitSort} />;
            }}
            name={"Sort"}
          />
        </div>
        <div className="flex-row flex-j-center flex-a-center pl-30 pr-30 relative">
          <input className="w-300"
            onChange={(e) => {
              setSearchPhrase(e.target.value);
            }}
          />
          <button
            className="s-20 text-center bg-transparent flex-row flex-ac-center color-black btn-del"
            onClick={search}
          >
            <IoCloseOutline className={"icon"} />
          </button>
          <button
            className="s-20 text-center bg-transparent flex-row flex-ac-center color-white"
            onClick={search}
          >
            <RiSearchLine className={"icon"} />
          </button>
        </div>

        <button
          className="text-white text-center bg-transparent w-110 flex-row flex-j-center s-16 flex-row flex-a-center p-10"
          onClick={() => {
            setNewCarVisible(!newCarVisible);
          }}
        >
          New Car  <HiOutlinePlusSm className="icon"/>
        </button>
        <button
          className="text-white text-center bg-transparent w-110 flex-row flex-j-center flex-a-center s-16 p-10"
          onClick={() => navigate("bookings")}
        >
          Bookings  <IoIosArrowForward className="icon"/>
        </button>
        <div className="a-right">
          <RiUserLine className="icon" onClick={() => logOut()} />
        </div>
      </div>
      <PureModal
          header="New car"
          onClose={() => {
            setNewCarVisible(false);
            return true;
          }}
          isOpen={newCarVisible}
      >
        <CarEditor
            cancelHandler={() => setNewCarVisible(false)}
            saveHandler={(car, uploadedImages) => {
              handleSaveNew(car, uploadedImages);
              setNewCarVisible(false);
            }}
        />
      </PureModal>
    </>
  );
};

export default NavigationBar;
