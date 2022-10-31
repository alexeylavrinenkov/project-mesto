import './index.css';

// Импорт данных
import {
  formConfig,
  cardConfig,
  initialCards,
  profilePopupForm,
  cardPopupForm,
  profileEditButton,
  profileAddButton,
  profilePopupNameInput,
  profilePopupWorkInput
} from '../utils/constants.js';

// Импорт классов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Экземпляры классов
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardSection.addItem(createCard(item));
  }
}, '.cards');

const profileFormValidator = new FormValidator(formConfig, profilePopupForm);
const cardFormValidator = new FormValidator(formConfig, cardPopupForm);

const popupWithImage = new PopupWithImage('.popup_type_image');

const profilePopupWithForm = new PopupWithForm(
  '.popup_type_profile',
  ({ name, work }) => {
    userInfo.setUserInfo(name, work);
  },
  profileFormValidator.resetPopup.bind(profileFormValidator)
);
const cardPopupWithForm = new PopupWithForm(
  '.popup_type_card',
  ({ title, link }) => {
    cardSection.addItem(createCard({ title, link }));
  },
  cardFormValidator.resetPopup.bind(cardFormValidator)
);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  workSelector: '.profile__work'
});

const createCard = ({ title, link }) => {
  const card = new Card(cardConfig, title, link, popupWithImage.open.bind(popupWithImage));
  const cardElement = card.generateCard();

  return cardElement;
}

// Добавление валидации формам
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Добавление начальных карточек в разметку
cardSection.renderItems();

// Установка слушателей событий попапам
popupWithImage.setEventListeners();
profilePopupWithForm.setEventListeners();
cardPopupWithForm.setEventListeners();

// Установка слушателей событий клика по кнопкам открытия попапов
profileEditButton.addEventListener('click', () => {
  const { name, work } = userInfo.getUserInfo();
  profilePopupNameInput.value = name;
  profilePopupWorkInput.value = work;
  profilePopupWithForm.open();
});
profileAddButton.addEventListener('click', cardPopupWithForm.open.bind(cardPopupWithForm));
