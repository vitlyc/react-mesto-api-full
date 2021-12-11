require('dotenv').config();

 class Api {
     constructor(config) {
         this._baseUrl = config.baseUrl;
         this._headers = config.headers;
     }

     getInitialCards() {
         return fetch(`${this._baseUrl}/cards`, {
                 method: "GET",
             headers: this._headers,
             })
             .then(this._checkStatusOK);
     }

     getUserInfo() {
         return fetch(`${this._baseUrl}/users/me`, {
                 method: "GET",
             headers: this._headers,
             })
             .then(this._checkStatusOK);
     }
     updateUserInfo(user) {
         return fetch(`${this._baseUrl}/users/me`, {
                 method: "PATCH",
             headers: this._headers,
                 body: JSON.stringify(user)
             })
             .then(this._checkStatusOK);
     }
     deleteCard(cardId) {
         return fetch(`${this._baseUrl}/cards/${cardId}`, {
                 method: "DELETE",
             headers: this._headers,
             })
             .then(this._checkStatusOK);
     }

     setAvatar(avatarLink) {
         return fetch(`${this._baseUrl}/users/me/avatar`, {
                 method: "PATCH",
                 headers: this._headers,
                 body: JSON.stringify({
                     avatar: avatarLink
                 })
             })
             .then(this._checkStatusOK);
     }

     likeCard(cardId, isLiked) {
         return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
             method: `${isLiked ? 'PUT' : 'DELETE'}`,
             headers: this._headers,
             })
             .then(this._checkStatusOK);
     }
     createNewCard({ name, link }) {
         return fetch(`${this._baseUrl}/cards`, {
                 method: "POST",
             headers: this._headers,
                 body: JSON.stringify({
                     name: name,
                     link: link
                 })
             })
             .then(this._checkStatusOK);
     }

     _checkStatusOK(res) {
         if (res.ok) {
             return res.json();
         }
         return Promise.reject(`Ошибка ${res.status}`);
     }
 }


const api = new Api({
    baseUrl: "https://api.privetik.nomoredomain.nomoredomains.rocks",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("jwt")}`,
    },
});

 export default api;
 