import { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, textOfButton }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      link: values.link,
      place: values.place
    })
  }

  useEffect(() => {
    setValues({ place: '', link: '' });
    setErrors({});
    setIsValid(false);
  }, [isOpen]);

  return (
    <PopupWithForm name="add" title="Новое место" onClose={onClose} isOpen={isOpen} text={textOfButton} onSubmit={handleSubmit} isFormValid={isValid}>
      <input
        required
        type="text"
        name="place"
        minLength="2"
        id="place-input"
        placeholder="Название"
        onChange={handleChange}
        value={values.place || ''}
        className={`popup__input popup__input_type_place ${errors.place === undefined || errors.place === '' ? '' : 'popup__input_type_error'}`}
      />
      <span id="place-input-error" className="popup__error">{errors.place === undefined ? '' : errors.place}</span>
      <input
        required
        type="url"
        name="link"
        minLength="2"
        id="link-input"
        onChange={handleChange}
        value={values.link || ''}
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_type_link ${errors.link === undefined || errors.link === '' ? '' : 'popup__input_type_error'}`}
      />
      <span id="link-input-error" className="popup__error">{errors.link === undefined ? '' : errors.link}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;