import React from 'react';
import registerOk from "../images/RegisterOk.svg";
import registerError from "../images/RegisterError.svg";

function InfoToolTip(props) {
    
    return ((
        < div className={props.isOpen ? `popup popup_opened popup_type_success` : `popup popup_type_success`} >
            <div className="popup__container" name={props.name} >
                <img
                    className="popup__icon"
                    src={props.resStatus ? registerOk : registerError}
                    alt="approved"
                />
                <h2 className="popup__title" style={{ textAlign: 'center', fontSize: '20px', paddingBottom: '0' }}>
                    {props.resStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
                <button className="popup__close-button" type="reset" onClick={props.closeAllPopups}></button>
            </div>
        </div >
    ));
};

export default InfoToolTip;