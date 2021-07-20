const modalSuccess = document.querySelector('#success').content.querySelector('.success');
const modalError = document.querySelector('#error').content.querySelector('.error');
const content = document.querySelector('body');
const DATA_ERROR_INTERVAL = 5000;

const onModalSuccessEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeModalSuccess();
  }
};

const onModalSuccessClick = () => closeModalSuccess();

const showModalSuccess = () => {
  content.appendChild(modalSuccess);
  window.addEventListener('keydown', onModalSuccessEscKeydown);
  window.addEventListener('click', onModalSuccessClick);
};

function closeModalSuccess() {
  content.removeChild(modalSuccess);
  window.removeEventListener('keydown', onModalSuccessEscKeydown);
  window.removeEventListener('click', onModalSuccessClick);
}

const onModalErrorEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeModalError();
  }
};

const onModaErrorClick = () => closeModalError();

const showModalError = () => {
  content.appendChild(modalError);
  window.addEventListener('keydown', onModalErrorEscKeydown);
  window.addEventListener('click', onModaErrorClick);
};

function closeModalError() {
  content.removeChild(modalError);
  window.removeEventListener('keydown', onModalErrorEscKeydown);
  window.removeEventListener('click', onModaErrorClick);
}

const getModalError = () => {
  const modalDataError = document.querySelector('.data-error');

  modalDataError.classList.remove('hidden');

  setTimeout(() => {
    modalDataError.classList.add('hidden');
  }, DATA_ERROR_INTERVAL);
};

export { showModalSuccess, showModalError, getModalError };
