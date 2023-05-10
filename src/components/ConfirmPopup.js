import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onDelete, card, buttonText }) {
  
  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card);
  }
  return (
    <PopupWithForm name="delete" title="Вы уверены?" onClose={onClose} isOpen={isOpen} text={buttonText} onSubmit={handleSubmit} />
  )
}

export default ConfirmPopup;