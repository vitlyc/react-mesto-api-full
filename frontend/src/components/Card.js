import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import { RiHeartFill } from "react-icons/ri";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser.userId;
    const isLiked = props.card.likes.some((i) => i._id === currentUser.userId);

    // const Heart = () => (
    //     <RiHeartFill type="button" className= "element__heart" color={isLiked ? "black" : "#dcdcdc"} size='25px' onClick={() => {
    //         props.onCardLike(props.card)
    //     }}/>
    // );

    return ((
        <li className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <button className="element__remove-button" type="button" style={isOwn ? { visibility: 'visible' } : { visibility: 'hidden' }}
                onClick={() => props.onCardDelete(props.card)}></button>
            <div className="element__heading">
                <p className="element__title">{props.card.name}</p>
                <div className="element__container">
                    <button className={isLiked ? "element__heart element__heart_active" : "element__heart element__heart_disabled"} 
                    type="button" onClick={() => {
                        props.onCardLike(props.card)
                    }}></button>
                    {/* <Heart /> */}
                    <p className='element__counter'>{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    ));
};

export default Card;



