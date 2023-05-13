import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from './contexts/CurrentUserContext';

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, isOpen, onUpdateUser, textOfButton }) {
  const currentUser = useContext(CurrentUserContext);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange (e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };
  
  useEffect(() => {
    if (values.name === currentUser.name && values.job === currentUser.about) {
      setIsValid(false);
    }
    else {
      setIsValid(true)
    }
  }, [currentUser, values]);
  
  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({
      name: values.name,
      about: values.job,
    });
  }
  useEffect(() => {
    setValues({ name: currentUser.name, job: currentUser.about });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" onClose={onClose} isOpen={isOpen} text={textOfButton} onSubmit={handleSubmit} isFormValid={isValid}>
      <input
        required
        type="text"
        name="name"
        minLength={2}
        value={values.name || ''}
        id="name-input"
        placeholder="Имя"
        onChange={handleChange}
        className={`popup__input popup__input_type_name ${errors.name === undefined || errors.name === '' ? '' : 'popup__input_type_error'}`}
      />
      <span id="name-input-error" className="popup__error">
        {errors.name === undefined ? '' : errors.name}
      </span>

      <input
        required
        name="job"
        type="text"
        minLength={2}
        id="job-input"
        value={values.job || ''}
        placeholder="Профессия"
        onChange={handleChange}
        className={`popup__input popup__input_type_job ${errors.job === undefined || errors.job === '' ? '' : 'popup__input_type_error'}`}
      />
      <span id="job-input-error" className="popup__error">
        {errors.job === undefined ? '' : errors.job}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;