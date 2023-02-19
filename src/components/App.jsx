import { useState, useEffect, useRef } from 'react';
import css from 'components/App.module.css';
import { Notify } from 'notiflix';
import { fetchApi } from 'fetchApi/fetchApi';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export function App() {
  const perPage = useRef(12);
  const [isLoading, setIsLoading] = useState(false);
  const [namePhoto, setNamePhoto] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  useEffect(() => {
    if (!namePhoto) {
      return;
    }
    setIsLoading(true);
    setIsVisibleBtn(false);

    fetchApi(namePhoto, page, perPage.current)
      .then(({ data: { hits, totalHits } }) => {
        setPhotos(prevPhotos => [...prevPhotos, ...hits]);
        setIsVisibleBtn(true);

        const countPages = Math.ceil(totalHits / perPage.current);        

        if (countPages === page) {
          setIsVisibleBtn(false);
          Notify.info(`We're sorry, but you've reached the end of search`);
        }
      })
      .catch(() => Notify.failure('Sorry, try again'))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, namePhoto]);

  const handleFormSubmit = photo => {
    if (photo !== namePhoto) {
      setNamePhoto(photo);
      setPhotos([]);
      setIsVisibleBtn(false);
      setPage(1);
    } else {
      Notify.info('The new search must be different from the current search');
    }
  };

  const onloadMore = () => {
    setPage(page => page + 1);
  };

  const onOpenModal = data => {
    setCurrentPhoto(data);
  };

  const onCloseModal = () => {
    setCurrentPhoto(null);
  };

  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleFormSubmit} />
      {photos.length !== 0 && (
        <>
          <ImageGallery photos={photos} openModal={onOpenModal} />
          {isVisibleBtn && (
            <Button text="load more" clickHandler={onloadMore} />
          )}
        </>
      )}
      {isLoading && <Loader />}
      {currentPhoto && (
        <Modal showModal={currentPhoto} closeModal={onCloseModal} />
      )}
    </div>
  );
}
