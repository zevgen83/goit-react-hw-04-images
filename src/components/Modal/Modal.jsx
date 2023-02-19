import { useEffect } from 'react';
import css from 'components/Modal/Modal.module.css';
import PropTypes from 'prop-types';

export function Modal({ showModal: { src, alt }, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return window.removeEventListener('keydown', closeModal);
  });

  const closeModalBy = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div className={css.Backdrop} onClick={closeModalBy}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  showModal: PropTypes.objectOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  closeModal: PropTypes.func.isRequired,
};
