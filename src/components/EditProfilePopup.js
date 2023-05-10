import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from './contexts/CurrentUserContext';

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, isOpen, onUpdateUser, buttonText }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
    
  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({
      name,
      about: description,
    });
  }
  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeAbout(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" onClose={onClose} isOpen={isOpen} text={buttonText} onSubmit={handleSubmit} >
      <input
        required
        type="text"
        name="name"
        value={name}
        minLength="2"
        maxLength="40"
        id="name-input"
        placeholder="Имя"
        onChange={handleChangeName}
        className="popup__input popup__input_type_name"
      />
      <span id="name-input-error" className="popup__error"></span>

      <input
        required
        name="job"
        type="text"
        minLength="2"
        id="job-input"
        maxLength="200"
        value={description}
        placeholder="Профессия"
        onChange={handleChangeAbout}
        className="popup__input popup__input_type_job"
      />
      <span id="job-input-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;