import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      place: place,
      link: link
    })
  }
  function handleChangeLink(e) {
    setLink(e.target.value)
  }
  function handleChangePlace(e) {
    setPlace(e.target.value)
  }

  return (
    <PopupWithForm name="add" title="Новое место" onClose={onClose} isOpen={isOpen} text="Сохранить" onSubmit={handleSubmit}>
      <input
        required
        type="text"
        name="place"
        minLength="2"
        id="place-input"
        placeholder="Название"
        onChange={handleChangePlace}
        className="popup__input popup__input_type_place"
      />
      <span id="place-input-error" className="popup__error"></span>
      <input
        required
        type="url"
        name="link"
        id="link-input"
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_link"
      />
      <span id="link-input-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;