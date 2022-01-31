// const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://8274281c-8a3d-4db6-bf0b-5402ae33c890.mock.pstmn.io';
import {Car} from "../objects/Car";

const BASE_URL = 'https://pw2021-react-carly-backend.azurewebsites.net';

export const getCars = async (securityToken: string) => {
    return fetch(`${BASE_URL}/cars`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${securityToken}`
            }
        }).then(response => {
        if (response.ok) return response.json()
        throw response;
    })
}

export const getCarsWithParams =
    async(securityToken: string, page: number, perPage: number, query: string) => {

    return fetch(
        `${BASE_URL}/cars?page=${page}&per_page=${perPage}&${query}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${securityToken}`
            }
        }).then(response => {
        if (response.ok) return response.json()
        throw response;
    })
}

export const getCar = async (id: string, securityToken: string) => {
    return fetch(`${BASE_URL}/cars/${id}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${securityToken}`
            }
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const addCar = async (car: Car, securityToken: string) => {

    return fetch(`${BASE_URL}/cars/${car.id}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${securityToken}`
            },
            body: JSON.stringify([car])
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const updateCar = async (car: Car, securityToken: string) => {

    return fetch(`${BASE_URL}/cars/${car.id}`,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${securityToken}`
            },
            body: JSON.stringify(car)
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const deleteCar = async (id: string, securityToken: string) => {

    return fetch(`${BASE_URL}/cars/${id}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${securityToken}`
            },
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const getImagesIds = async (carId: string, securityToken: string) => {

    return fetch(`${BASE_URL}/cars/${carId}/imageIds`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${securityToken}`
            },
        }).then(response => {
        if (response.ok) return response.json()
        throw response;
    })
}

export interface BookingParams {
    active?: boolean;
    date_sort?: BookingsSortingOrder;
    page?: number;
    per_page?: number;
}

export enum BookingsSortingOrder {
    Asc,
    Desc
}

function convertFilterToString(filter?: BookingParams) {
    if (!filter) return ""
    let filterStr = "?"

    if(filter.active) filterStr += "active=" + filter.active + "&"
    if(filter.date_sort) { // @ts-ignore
        filterStr += "date_sort=" + ((filter.date_sort === 0) ? "asc" : "desc") + "&"
    }
    if(filter.page) filterStr += "page=" + filter.page + "&"
    if(filter.per_page) filterStr += "per_page=" + filter.per_page

    return filterStr; // todo - change to params from url (copy - paste from url)
}

export const getBookingsFiltered = async (securityToken: string, page: number, filter?: string) => {
    const filterString = (filter ?? "").length > 0 ? "&" + filter : "";
    return fetch(`${BASE_URL}/bookings?page=${page}&per_page=8${filterString}` ,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${securityToken}`
            }
        }).then(response => {
        if (response.ok)
        {
            return response.json()
        }
        throw response;
    })
}

export const deactivateBooking = async (id: string, securityToken: string) => {
    return fetch(`${BASE_URL}/bookings/${id}`, //TODO not working problem with cors
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'security-header': `Bearer ${securityToken}`
            }
        }).then(response => {
        if (response.ok) return response.json()
        throw response;
    })
}

export const uploadImage = async (carId: string, image: File, securityToken: string) => {

    const formData = new FormData()
    formData.append("file", image, image.name)

    return fetch(`${BASE_URL}/images/${carId}`,
        {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${securityToken}`
            },
            body: formData,
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}


export const deleteImage = async (id: string, securityToken: string) => {
    return fetch(`${BASE_URL}/images/${id}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${securityToken}`
            },
        }).then(response => {
            if (response.ok) {
                return response;
            } else {
                throw response;
            }
        })
}

export const imageUri = (imageId: string) => {
    return `${BASE_URL}/images/${imageId}`
}