import React from 'react';

function Card({ card, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  } 

  return (
    <article className="element">
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className="element__like" type="button" aria-label="Лайк"></button>
          <div className="element__like-count">{card.likes.length}</div>
        </div>
      </div>
      <button className="element__trash"></button>
    </article>
  );
}

export default Card; 