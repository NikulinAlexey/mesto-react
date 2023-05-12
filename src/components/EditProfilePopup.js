import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from './contexts/CurrentUserContext';

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, isOpen, onUpdateUser, textOfButton }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [isFirstRenderJob, setIsFirstRenderJob] = useState(true);
  const [isFirstRenderName, setIsFirstRenderName] = useState(true);
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNameInputValid, setIsNameInputValid] = useState(false);
  const [isDescriptionInputValid, setIsDescriptionInputValid] = useState(false);
  
  const inputErrorText = 'Текст должен быть не короче 2 символов.';
  
  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({
      name,
      about: description,
    });
  }
  function closeByCloseIcon() {
    onClose();

    setName(currentUser.name);
    setDescription(currentUser.about);

    setIsFirstRenderJob(true);
    setIsFirstRenderName(true);
  }
  function handleChangeName(e) {
    setName(e.target.value);

    if (name.length >= 2) {
      setIsNameInputValid(true);
    }
    else {
      setIsNameInputValid(false)
    }

    setIsFirstRenderName(false)
  }
  function handleChangeAbout(e) {
    setDescription(e.target.value);

    if (description.length >= 2 ) {
      setIsDescriptionInputValid(true);
    }
    else {
      setIsDescriptionInputValid(false)
    }

    setIsFirstRenderJob(false)
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  useEffect(() => {
    if ((isNameInputValid && isDescriptionInputValid) && (isFirstRenderJob === false || isFirstRenderName === false)) {
      setIsFormValid(true);
    }
    else {
      setIsFormValid(false);
    }
  }, [isNameInputValid, isDescriptionInputValid, isFirstRenderJob, isFirstRenderName]);

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" onClose={closeByCloseIcon} isOpen={isOpen} text={textOfButton} onSubmit={handleSubmit} isFormValid={isFormValid}>
      <input
        required
        type="text"
        name="name"
        value={name || ''}
        id="name-input"
        placeholder="Имя"
        onChange={handleChangeName}
        className={`popup__input popup__input_type_name ${!isNameInputValid && !isFirstRenderName ? 'popup__input_type_error' : ''}`}
      />
      <span id="name-input-error" className="popup__error">
        {!isNameInputValid && !isFirstRenderName ? inputErrorText : ''}
      </span>

      <input
        required
        name="job"
        type="text"
        id="job-input"
        value={description || ''}
        placeholder="Профессия"
        onChange={handleChangeAbout}
        className={`popup__input popup__input_type_job ${!isDescriptionInputValid && !isFirstRenderJob ? 'popup__input_type_error' : ''}`}
      />
      <span id="job-input-error" className="popup__error">
        {!isDescriptionInputValid && !isFirstRenderJob ? inputErrorText : ''}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;