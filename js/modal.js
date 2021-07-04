const modalSuccess = document.querySelector('#success').content.querySelector('.success');
const modalError = document.querySelector('#error').content.querySelector('.error');
const content = document.querySelector('body');
const DATA_ERROR_INTERVAL = 5000;

const showModalSuccess = () => {
  content.appendChild(modalSuccess);

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      content.removeChild(modalSuccess);
    }
  },
  {once: true},
  );

  window.addEventListener('click', (evt) => {
    evt.preventDefault();
    content.removeChild(modalSuccess);
  },
  {once: true},
  );
};

const showModalError = () => {
  content.appendChild(modalError);

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      content.removeChild(modalError);
    }
  },
  {once: true},
  );

  window.addEventListener('click', (evt) => {
    evt.preventDefault();
    content.removeChild(modalError);
  },
  {once: true},
  );
};

const getModalError = () => {
  const modalDataError = document.querySelector('.data-error');

  modalDataError.classList.remove('hidden');

  setTimeout(() => {
    modalDataError.classList.add('hidden');
  }, DATA_ERROR_INTERVAL);
};

export {showModalSuccess, showModalError, getModalError};
