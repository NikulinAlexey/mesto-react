import React from 'react';


function PopupWithImage({card, onClose}) {
  return (
    <div className="popup image-popup image-popup_type_image">
      <div className="image-popup__container">
        <button className="image-popup__close-icon" type="button" onClick={onClose}></button>
        <img src={card.link} alt="" className="image-popup__image" />
        <h2 className="image-popup__title">{card.name}</h2>
      </div>
    </div>
  );
}

export default PopupWithImage; 