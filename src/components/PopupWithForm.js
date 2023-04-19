import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name}`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}}`} noValidate>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm; 