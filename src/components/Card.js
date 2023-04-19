import React from 'react';

function Card({ card, name, link, likes, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  } 

  return (
    <article className="element">
      <img src={link} alt={name} className="element__image" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-container">
          <button className="element__like" type="button" aria-label="Лайк"></button>
          <div className="element__like-count">{likes}</div>
        </div>
      </div>
      <button className="element__trash"></button>
    </article>
  );
}

export default Card; 