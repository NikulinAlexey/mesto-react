import { useContext, useEffect, useRef, useState } from "react";

import { CurrentUserContext } from "./contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarRef = useRef('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateAvatar(`${avatarRef.current.value}`)
  }
  function handleChangeAvatar(e) {
    setAvatar(e.target.value)
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" onClose={onClose} isOpen={isOpen} text="Сохранить" onSubmit={handleSubmit}>
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
        className="popup__input popup__input_type_avatar"
      />
      <span id="avatar-input-error" className="popup__error"></span>
    </PopupWithForm>  
  )
}

export default EditAvatarPopup;