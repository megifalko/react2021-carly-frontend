
const BASE_URL = 'http://localhost:8080';

export const getCars = async (securityToken: string) => {

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

export const getCar = async (id: string, securityToken: string) => {

    return fetch(`${BASE_URL}/cars/${id}`,
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
