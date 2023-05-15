import useFormWithValidation from "../hooks/useValidationForm";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, textOfButton }) {
  const { values, handleChange, resetForm, isValid, errors } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateAvatar(`${values.avatar}`);

    resetForm();
  }

  function closeByCloseIcon() {
    onClose();
    resetForm();
  }
 
  return (
    <PopupWithForm name="avatar" title="Обновить аватар" onClose={closeByCloseIcon} isOpen={isOpen} text={textOfButton} onSubmit={handleSubmit} isFormValid={isValid}>
      <input
        required
        type="url"
        name="avatar"
        minLength="2"
        value={values.avatar || ''}
        onChange={handleChange}
        id="avatar-input"
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_type_avatar ${errors.avatar === undefined || errors.avatar === '' ? '' : 'popup__input_type_error'}`}
      />
      <span id="avatar-input-error" className="popup__error">{errors.avatar === undefined ? '' : errors.avatar  }</span>
    </PopupWithForm>  
  )
}

export default EditAvatarPopup;