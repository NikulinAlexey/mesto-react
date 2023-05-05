import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onDelete, card }) {
  console.log(card)
  function handleSubmit(e) {
    e.preventDefault();

    onDelete(card)
  }
  return (
    <PopupWithForm name="delete" title="Вы уверены?" onClose={onClose} isOpen={isOpen} text="Да" onSubmit={handleSubmit}>
    </PopupWithForm>
  )
}

export default ConfirmPopup;