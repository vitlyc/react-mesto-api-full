export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const escapeCode = 27

export const buttonEditProfile = document.querySelector('.profile__edit-button')
export const buttonAddProfile = document.querySelector('.profile__add-button')
export const titleProfile = document.querySelector('.profile__title')
export const titleProfileSelector = '.profile__title'
export const subtitleProfile = document.querySelector('.profile__subtitle')
export const subtitleProfileSelector = '.profile__subtitle'

export const buttonEditAvatar = document.querySelector('.profile__edit-avatar')
export const userAvatar = document.querySelector('.profile__avatar')


export const popupEditProfile = document.querySelector('.popup_type_edit-profile')
export const popupEditProfileSelector = ('.popup_type_edit-profile')
export const formEditProfile = popupEditProfile.querySelector('.popup__container')
export const inputNameEditProfile = formEditProfile.querySelector('.popup__text_type_name')
export const inputProfessionEditProfile = formEditProfile.querySelector('.popup__text_type_profession')
export const buttonSaveEditProfile = formEditProfile.querySelector('.popup__save-button')
export const buttonCloseEditProfile = formEditProfile.querySelector('.popup__close-button')

export const popupAddCard = document.querySelector('.popup_type_add-card')
export const popupAddCardSelector = ('.popup_type_add-card')
export const formAddCard = popupAddCard.querySelector('.popup__container')
export const inputPlaceAddCard = formAddCard.querySelector('.popup__text_type_place')
export const inputSourceAddCard = formAddCard.querySelector('.popup__text_type_source')
export const buttonSaveAddCard = formAddCard.querySelector('.popup__save-button')
export const buttonCloseAddCard = formAddCard.querySelector('.popup__close-button')

export const popupImage = document.querySelector('.popup_type_image')
export const popupImageSelector = '.popup_type_image'
export const imageContainer = popupImage.querySelector('.popup__image-container')
export const buttonCloseImage = imageContainer.querySelector('.popup__close-button')
export const pictureImage = imageContainer.querySelector('.popup__image')
export const titleImage = imageContainer.querySelector('.popup__title')


export const popupApproval = document.querySelector('.popup_type_update-avatar')
export const formApproval = popupApproval.querySelector('.popup__container')
export const popupApprovalSelector = '.popup_type_approval'

export const popupAvatar = document.querySelector('.popup_type_update-avatar')
export const formAvatar = popupAvatar.querySelector('.popup__container')
export const popupAvatarSelector = '.popup_type_update-avatar'

export const elementsList = document.querySelector('.elements__list')
export const elementsListSelector = ('.elements__list')
export const template = elementsList.querySelector('.template').content

export const popupList = Array.from(document.querySelectorAll('.popup'))
export const formList = Array.from(document.querySelectorAll('.popup__container'))

export const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text_error',
    errorClass: 'popup__error_visible'
}