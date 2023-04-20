import { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  function handleEditAvatarClick() {
    document.querySelector('.popup_type_avatar').classList.add('popup_opened');
  }
  function handleEditProfileClick() {
    document.querySelector('.popup_type_edit').classList.add('popup_opened');
  }
  function handleAddPlaceClick() {
    document.querySelector('.popup_type_add').classList.add('popup_opened');
  }
  function closeAllPopups() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
  function handleCardClick(card) {
    setSelectedCard(card)
    document.querySelector('.image-popup').classList.add('popup_opened')
  }
  useEffect(() => {

  })
  const [isEditProfilePopupOpen, openEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, openAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, openEditAvatarPopup] = useState(false);
  const [isDeletePopupOpen, openDeletePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  return (
    <>
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
        <Footer />
      </div>

      
      <PopupWithForm name="edit" title="Редактировать профиль" onClose={closeAllPopups} isOpened={isEditProfilePopupOpen} >
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
        <button type="submit" className="popup__submit popup__submit_type_edit">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="add" title="Новое место" onClose={closeAllPopups} isOpened={isAddPlacePopupOpen}>
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
        <button type="submit" className="popup__submit popup__submit_type_add">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" onClose={closeAllPopups} isOpened={isEditAvatarPopupOpen}>
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
        <button type="submit" className="popup__submit popup__submit_type_avatar">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} isOpened={isDeletePopupOpen}>
        <button type="submit" className="popup__submit popup__submit_type_delete">Да</button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
