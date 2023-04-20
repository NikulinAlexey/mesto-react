import React from 'react';

function PopupWithForm({name, onClose, isOpen, title, children, text}) {
  return (

    isOpen ? (
      <div className={`popup popup_type_${name} popup_opened`}>
        <div className="popup__container">
          <button className="popup__close-icon" type="button" onClick={onClose}></button>
          <h2 className="popup__title">{title}</h2>
          <form className={`popup__form popup__form_type_${name}}`} noValidate>
            {children}
            <button type="submit" className={`popup__submit popup__submit_type_${name}`}>{text}</button>
          </form>
        </div>
      </div>
    ) : (
      <div className={`popup popup_type_${name}`}>
        <div className="popup__container">
          <button className="popup__close-icon" type="button" onClick={onClose}></button>
          <h2 className="popup__title">{title}</h2>
          <form className={`popup__form popup__form_type_${name}}`} noValidate>
              {children}
              <button type="submit" className={`popup__submit popup__submit_type_${name}`}>{text}</button>
          </form>
        </div>
      </div>
    )

  );
}

export default PopupWithForm; 