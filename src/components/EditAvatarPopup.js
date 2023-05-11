import { useEffect, useRef, useState } from "react";


import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, textOfButton }) {
  const avatarRef = useRef('');
  const [avatar, setAvatar] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const avatarErrorText = 'Некорректная ссылка на изображение.';


  useEffect(() => {
    const regLink = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
    const isLinkOk = regLink.test(avatar);

    if (isLinkOk) {
      setIsFormValid(true);
    }
    else {
      setIsFormValid(false)
    }
  }, [avatar]);

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateAvatar(`${avatarRef.current.value}`)
    setAvatar('');
  }
  function handleChangeAvatar(e) {
    setAvatar(e.target.value)
  }
  function closeByCloseIcon() {
    onClose()

    setAvatar('');
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" onClose={closeByCloseIcon} isOpen={isOpen} text={textOfButton} onSubmit={handleSubmit} isFormValid={isFormValid}>
      <input
        required
        value={avatar}
        onChange={handleChangeAvatar}
        ref={avatarRef}
        type="url"
        name="avatar"
        minLength="2"
        id="avatar-input"
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_type_avatar ${!isFormValid && avatar ? 'popup__input_type_error' : ''}`}
      />
      <span id="avatar-input-error" className="popup__error">{!isFormValid && avatar ? avatarErrorText : '' }</span>
    </PopupWithForm>  
  )
}

export default EditAvatarPopup;