import React from 'react';

function PopupWithForm(props) {
    return ((
        <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened ` : `popup popup_type_${props.name}`} >
            <form className="popup__container container" name={props.name}  onSubmit={props.onSubmit}>
                <h3 className="popup__title">{props.title}</h3>
                {props.children}
                <button className="popup__save-button" type="submit">{props.buttonName}</button>
                <button className="popup__close-button" type="button" onClick={props.closeAllPopups}></button>
            </form>
        </div>
    ));
};

export default PopupWithForm;