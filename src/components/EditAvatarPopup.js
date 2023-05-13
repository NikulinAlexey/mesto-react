import { useEffect, useState } from "react";


import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, textOfButton }) {
  
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

  useEffect(() => {
    setValues({ avatar: '' });
    setErrors({});
    setIsValid(false);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateAvatar(`${values.avatar}`);
  }
 
  return (
    <PopupWithForm name="avatar" title="Обновить аватар" onClose={onClose} isOpen={isOpen} text={textOfButton} onSubmit={handleSubmit} isFormValid={isValid}>
      <input
        required
        type="url"
        name="avatar"
        minLength="2"
        value={values.avatar || ''}
        onChange={handleChange}
        id="avatar-input"
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_type_avatar ${errors.avatar === undefined || errors.avatar === '' ? '' : 'popup__input_type_error'}`}
      />
      <span id="avatar-input-error" className="popup__error">{errors.avatar === undefined ? '' : errors.avatar  }</span>
    </PopupWithForm>  
  )
}

export default EditAvatarPopup;