
export default () => {
    const BASE_URL = 'https://pw2021-react-carly-backend.azurewebsites.net';

    const getLocationValues = async (securityToken: string) => {
        return fetch(`${BASE_URL}/cars/locations`,
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

    const getModelsValues = async (securityToken: string) => {
        return fetch(`${BASE_URL}/cars/models`,
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

    return {getLocationValues, getModelsValues};
}
