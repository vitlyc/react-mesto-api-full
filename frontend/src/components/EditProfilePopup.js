import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.userName);
    const [description, setDescription] = React.useState(currentUser.userDescription);
  
    // const [name, setName] = React.useState('');
    // const [description, setDescription] = React.useState('');


    React.useEffect(() => {
        setName(currentUser.userName);
        setDescription(currentUser.userDescription);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
         setName(e.target.value);
    }
    function handleChangeDescription(e) {
      
         setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
         props.onUpdateUser({
             name: name,
             about: description,
         });
    }

    return ((
        <PopupWithForm name="user-data" title="Редактировать профиль" buttonName="Сохранить" isOpen={props.isOpen} closeAllPopups={props.onClose} onSubmit={handleSubmit}>
            <input id="name-input" className="popup__text popup__text_type_name" 
            type="text" name="name" minLength="2" maxLength="40" required placeholder="Имя"
                value={name || ''} onChange={handleChangeName} />
            <span className="popup__error name-input-error" id="name-input-error"></span>
            <input id="profession-input" className="popup__text popup__text_type_profession" 
            type="text" name="profession" minLength="2" maxLength="200" required placeholder="Профессия"
                value={description || ''} onChange={handleChangeDescription}/>
            <span className="popup__error profession-input-error" id="profession-input-error"></span>
        </PopupWithForm>
    ));
};

export default EditProfilePopup;













