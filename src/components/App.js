import { useState, useEffect } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import api  from '../utils/Api';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';


function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item !== card))
      })
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(userData) {
    api.editProfileInfo(userData)
      .then((res) => {
        setCurrentUser(res)
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        
      })
  }
  function handleUpdateAvatar(avatarInputValue) {
    api.changeAvatar(avatarInputValue)
      .then(() => {
        setCurrentUser({
          avatar: avatarInputValue,
          name: currentUser.name,
          about: currentUser.about,
        })
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        
      })
  }
  function handleAddPlaceSubmit(cardData) {
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
      
        console.log(err)
      })
      .finally(() => {
        
      })
  }

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {

      })
  }, []);
  useEffect(() => {
    api.getProfileInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        
      })
  }, []);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          setIsDeletePopupOpen={setIsDeletePopupOpen}
        />
        <Footer />
      </div>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      
      <ConfirmPopup isOpen={isDeletePopupOpen} onClose={closeAllPopups} onDelete={handleCardDelete} card={selectedCard} />

    </CurrentUserContext.Provider>
  );
}

export default App;
