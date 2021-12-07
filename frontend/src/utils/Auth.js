export const BASE_URL = "https://api.privetik.nomoredomain.nomoredomains.rocks";

const resStatus = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
};

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
            method: "POST",
            credentials: 'include',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                email,
            }),
        })
        .then((response) => {
            return resStatus(response);
        })
        .then((data) => {
            return data;
        });
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                email,
            }),
        })
        .then((response) => {
            return resStatus(response);
        })
        .then((data) => {
            return data;
        });
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(resStatus);
};