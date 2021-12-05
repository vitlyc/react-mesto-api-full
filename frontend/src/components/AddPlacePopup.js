import React from 'react';
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
    const namePlaceRef = useRef();
    const linkPlaceRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            link: linkPlaceRef.current.value,
            name: namePlaceRef.current.value,
        });
        namePlaceRef.current.value = ''
        linkPlaceRef.current.value = ''
    }

    return ((
        <PopupWithForm name="place-data" title="Новое место" buttonName="Сохранить" isOpen={props.isOpen} closeAllPopups={props.onClose} onSubmit={handleSubmit}>
            <input id="place-input" className="popup__text popup__text_type_place" placeholder="Название" type="text" name="name" minLength="2" maxLength="30" required ref={namePlaceRef}/>
            <span id="place-input-error" className="popup__error place-input-error"></span>
            <input id="url-input" type="url" name="link" placeholder="Ссылка на картинку" className="popup__text popup__text_type_source" required ref={linkPlaceRef}/>
            <span className="popup__error url-input-error"></span>
        </PopupWithForm>
    ));
};

export default AddPlacePopup;



