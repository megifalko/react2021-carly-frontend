import {Car} from "../objects/Car";
import {initMetric} from "web-vitals/dist/modules/lib/initMetric";

const BASE_URL = '';

export const getCars = async (securityToken: string) => {

    return fetch(`${BASE_URL}/cars`,
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
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
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
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
}

export const uploadImage = async (carId: string, image: File, securityToken: string) => {

    const formData = new FormData()
    formData.append("file", image, image.name)

    return fetch(`${BASE_URL}/images/${carId}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
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

export const imageUri = (imageId: string) => {
    return `${BASE_URL}/images/${imageId}`
}