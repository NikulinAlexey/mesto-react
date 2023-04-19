import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setuserDescription] = React.useState('');
  const [userAvatar, setAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfileInfo(setSearchQuery)
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
  }, [userName, userDescription, userAvatar]);

  React.useEffect(() => {
    api.getInitialCards(setSearchQuery)
      .then((res) => {
        setCards(res)
      })
  }, [searchQuery]);

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
        {cards.map(({id, ...card}, i) => (
          <Card key={i} card={card} name={card.name} link={card.link} likes={card.likes.length} onCardClick={onCardClick} />
          ))}
      </section>
    </main>
    
  );
}

export default Main; 