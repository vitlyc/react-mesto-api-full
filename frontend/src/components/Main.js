import React from 'react';
import Card from './Card'

import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    const cards = props.cards
    // console.log(currentUser.userDescription);
    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={currentUser.userAvatar} className="profile__avatar" alt="Аватар пользователя" onClick={props.onEditAvatar}/>
                    <button className="profile__edit-avatar" type="button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.userName}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__subtitle">{currentUser.userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.isAddPlacePopupOpen}></button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => {
                        
                        return (
                            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                        )
                    })}
                </ul>
            </section>
        </main>)
}

export default Main;



