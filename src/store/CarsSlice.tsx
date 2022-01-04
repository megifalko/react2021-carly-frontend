import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Car} from "../objects/Car";
import {getCars} from "../logic/api";

export interface CarsState {
    cars: Car[]
}
const initialState: CarsState = { cars: [] };

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        updateCars: (state, action: PayloadAction<string>) => {
            console.log("updateCars");
            getCars(action.payload).then(data => {
                state.cars = data;
            }).catch((e) => {
                console.error("Error during updating the cars list \n" +
                    JSON.stringify(e));
            })
        },
    },
});

export const { updateCars } = carsSlice.actions;

export default carsSlice.reducer;
