export default function () {
    const BASE_URL = 'https://pw2021-react-carly-backend.azurewebsites.net';

    const Authorize = async (login: string, password: string) => {
        return fetch(`${BASE_URL}/authenticate`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: login, password: password})
            }).then(response => {
                //401 - unauthorized
            if (response.ok) {
                return response.json();
            } else {
                if (response.status === 401) {
                    return {jwttoken: ""};
                }
                else
                    throw response;
            }
        })
    }
    return Authorize;
}