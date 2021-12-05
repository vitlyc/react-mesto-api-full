import React from 'react';
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
    const avatarLinkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarLinkRef.current.value
        });
    }

    return ((
        <PopupWithForm name="update-avatar" title="Обновить аватар" buttonName="Сохранить" isOpen={props.isOpen} closeAllPopups={props.onClose} onSubmit={handleSubmit}>
            <input id="avatar-input" type="url" name="link" placeholder="Ссылка на картинку" className="popup__text popup__text_type_source" required ref={avatarLinkRef}/>
            <span className="popup__error avatar-input-error popup__error_avatar"></span>
        </PopupWithForm>

        
    ));
};

export default EditAvatarPopup;