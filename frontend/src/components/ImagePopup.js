import React from 'react';

function ImagePopup(props) {
    return ((
        <div className={props.isOpen ? `popup popup_opened popup_type_${props.name}` : `popup popup_type_${props.name}`}>
            <div className="popup__image-container container">
                
                <button className="popup__close-button popup__close-button_type_image" type="button" onClick={props.closeAllPopups}></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <p className="popup__title popup__title_type_image">{props.card.name}</p>
            </div>
        </div>
    ));
};

export default ImagePopup;