// serve - s build
// npm start
import { Route, Link, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/Api.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import * as Auth from '../utils/Auth';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from './Login.js';
import InfoToolTip from './InfoToolTip';

// email@mail.com
// 12345

function App(props) {
   
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, selectCard] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

    const [userInfo, setUserInfo] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [resStatus, setResStatus] = React.useState(false);

    const auth = (jwt) => {
        return Auth.getContent(jwt).then((res) => {
            if (res) {
                setLoggedIn(true);
                
                setEmail(res.email);
            }
        })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            auth(jwt);
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) history.push("/main");
    }, [loggedIn, history]);

    const onReg = ({ passwordInput, emailInput }) => {
        return Auth.register(passwordInput, emailInput).then((res) => {
            if (!res || res.statusCode === 400) {
                throw new Error("Что-то пошло не так");
            } else
                return res;
        })
    };

    const onLog = ({ passwordInput, emailInput }) => {
        return Auth.authorize(passwordInput, emailInput).then((res) => {
            if (!res || !res.token)
                throw new Error("Неправильные имя пользователя или пароль");
            if (res.token) {
                setLoggedIn(true);
                localStorage.setItem("jwt", res.token);
            }
        })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSignOut = () => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        history.push("/sign-in");
    };

    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };
    function handleCardClick(select) {
        selectCard(select);
        setIsImagePopupOpen(true);
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsInfoToolTipOpen(false);
    };
    
    
    // console.log(userInfo);
    React.useEffect(() => {
        
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                console.log(userData.name, userData.avatar );
                setUserInfo({
                    userName: userData.name,
                    userDescription: userData.about,
                    userAvatar: userData.avatar,
                    userId: userData._id
                });
                setCards(initialCards);
                
            })
            .catch((err) => {
                console.log(err);
            });
    }, [history]);

    React.useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closeByEscape)

        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])



    function handleCardLike(card) {
        // console.log('hi');
        const isLiked = card.likes.some((id) => id === userInfo.userId);

        api.likeCard(card._id, isLiked)
        .then((newCard) => {
            setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
                console.log(err);
        });
        
    };

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards((cards) => cards.filter((c) => c._id !== card._id));
        })
        .catch((err) => {
                console.log(err);
        });
        
    };

    function handleUpdateUser(userData) {
        api.updateUserInfo(userData)
            .then((userData) => {
                setUserInfo({
                    userName: userData.data.name,
                    userDescription: userData.data.about,
                    userAvatar: userData.data.avatar,
                    userId: userData.data._id,
                });
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleUpdateavatar(userData) {
               api.setAvatar(userData.avatar)
            .then((userData) => {
                setUserInfo({
                    userName: userData.data.name,
                    userDescription: userData.data.about,
                    userAvatar: userData.data.avatar,
                    userId: userData.data._id,
                });
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleAddPlace(placeData) {
        api.createNewCard(placeData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const location = useLocation();

    function headerLogStatus() {
        switch (location.pathname) {
            case '/main':
                return (
                    <div className='header__auth'>
                        <p className='header__email' style={{ paddingRight: '24px' }}>{email}</p>
                        <Link className=" auth__link" to="/sign-up" onClick={onSignOut}>Выйти</Link>
                    </div>
                )

            case '/sign-in':
                return (
                    <div className='header__auth'><Link className=" auth__link" to="/sign-up">Регистрация</Link></div>
                )

            case '/sign-up':
                return (
                    <div className='header__auth'><Link className=" auth__link" to="/sign-in">Войти</Link></div>
                )

            default:
                break;
        }
    }

   
    return ((
        <div className="page">
            <CurrentUserContext.Provider value={userInfo}>
                    <Header>
                        {headerLogStatus()}
                        </Header>
                    <Switch>
                        <ProtectedRoute 
                        path="/main"
                            loggedIn={loggedIn}
                        component={Main} cards={cards} onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick} card={selectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onSignOut={onSignOut} />
                        <Route path="/sign-up">
                            <Register onReg={onReg} onInfoTool={setIsInfoToolTipOpen} setResStatus={setResStatus}>
                                <p className="auth__span">Уже зарегистрированы?<Link className="auth__span auth__link" to="/sign-in">  Войти</Link></p>
                            </Register>
                        </Route>
                        <Route path="/sign-in">
                            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} onLog={onLog} />
                        </Route>
                        <Route>
                            {loggedIn ? (<Redirect to="/main" />) : (<Redirect to="/sign-in" />)}
                        </Route>
                    </Switch>

                <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} closeAllPopups={closeAllPopups} />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateavatar} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

                <PopupWithForm name="approval" title="Вы уверены?" buttonName="Да" isOpen={false} />

                <InfoToolTip isOpen={isInfoToolTipOpen} closeAllPopups={closeAllPopups} resStatus={resStatus} />
                
                    <Footer />
               
            </CurrentUserContext.Provider>
        </div>
    ));
}
export default App;









