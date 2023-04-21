import { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
        <Footer />
      </div>
      
      <PopupWithForm name="edit" title="Редактировать профиль" onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} text="Сохранить" >
        <input
          type="text"
          id="name-input"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="name-input-error" className="popup__error"></span>
        <input
          type="text"
          id="job-input"
          className="popup__input popup__input_type_job"
          name="job"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="job-input-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="add" title="Новое место" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} text="Сохранить">
        <input type="text"
          id="place-input"
          className="popup__input popup__input_type_place"
          name="place"
          placeholder="Название"
          required
          minLength="2"
        />
        <span id="place-input-error" className="popup__error"></span>
        <input type="url"
          id="link-input"
          className="popup__input popup__input_type_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="link-input-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} text="Сохранить">
        <input
          type="url"
          id="avatar-input"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          minLength="2"
        />
        <span id="avatar-input-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} isOpen={isDeletePopupOpen} text="Да">
      </PopupWithForm>
      
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
