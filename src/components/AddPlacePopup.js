import { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, textOfButton }) {
  const [link, setLink] = useState('');
  const [place, setPlace] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLinkInputValid, setIsLinkInputValid] = useState(false);
  const [isPlaceInputValid, setIsPlaceInputValid] = useState(false);

  const placeErrorText = 'Текст должен быть не короче 2 символов.';
  const linkErrorText = 'Некорректная ссылка на изображение.';

  const regLink = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
  const isLinkOk = regLink.test(link);

  useEffect(() => {
    if (place.length >= 2) {
      setIsPlaceInputValid(true);
    }
    else {
      setIsPlaceInputValid(false)
    }
  }, [place]);

  useEffect(() => {
    if (isLinkOk) {
      setIsLinkInputValid(true);
    }
    else {
      setIsLinkInputValid(false)
    }
  }, [isLinkOk]);

  useEffect(() => {
    if (isPlaceInputValid && isLinkInputValid) {
      setIsFormValid(true);
    }
    else {
      setIsFormValid(false)
    }
  }, [isPlaceInputValid, isLinkInputValid]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      link: link,
      place: place
    })

    // Я не понял как вытащить сеттеры в компонент App, чтобы именно после закрытия попапа делать reset формы(асинхронно), поэтому вот так некрасиво сбрасываю :-)
    // другие формы reset-аю также :-(
    setLink('');
    setPlace('');
  }
  function handleChangeLink(e) {
    setLink(e.target.value)
  }
  function handleChangePlace(e) {
    setPlace(e.target.value)
  }
  function closeByCloseIcon() {
    onClose();

    setLink('');
    setPlace('');
  }

  return (
    <PopupWithForm name="add" title="Новое место" onClose={closeByCloseIcon} isOpen={isOpen} text={textOfButton} onSubmit={handleSubmit} isFormValid={isFormValid}>
      <input
        required
        type="text"
        name="place"
        value={place}
        id="place-input"
        placeholder="Название"
        onChange={handleChangePlace}
        className={`popup__input popup__input_type_place ${!isPlaceInputValid && place ? 'popup__input_type_error' : ''}`}
      />
      <span id="place-input-error" className="popup__error">{!isPlaceInputValid && place ? placeErrorText : ''}</span>
      <input
        required
        type="url"
        name="link"
        value={link}
        id="link-input"
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_type_link ${!isLinkInputValid && link ? 'popup__input_type_error' : ''}`}
      />
      <span id="link-input-error" className="popup__error">{!isLinkInputValid && link ? linkErrorText : ''}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;