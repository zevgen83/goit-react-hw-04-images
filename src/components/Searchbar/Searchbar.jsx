import { useState } from 'react';
import { Notify } from 'notiflix';
import css from 'components/Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

export function SearchBar({ onSubmit }) {
  const [namePhoto, setNamePhoto] = useState('');

  const handleNameChange = e => {
    setNamePhoto(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (namePhoto.trim() === '') {
      Notify.info('Enter photo name!');
    }
    onSubmit(namePhoto);
    setNamePhoto('');
    e.target.reset();
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}></button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={namePhoto}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
