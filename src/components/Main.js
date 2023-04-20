import { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setuserDescription] = useState('');
  const [userAvatar, setAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getProfileInfo()
      .then((res) => {
        setUserName(res.name);
        setuserDescription(res.about);
        setAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        
      })
  },[]);

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
  },[]);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar-mask" onClick={onEditAvatar}></div>
          <img src={userAvatar} alt="Аватар анкеты" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__main">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map(({ _id, ...card }) => (
          <Card key={_id} card={card} onCardClick={onCardClick} />
          ))}
      </section>
    </main>
    
  );
}

export default Main; 