import Searchbar from 'components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import { fetchImages } from 'api/api';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchImage, setSearchImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSearchFormSubmit = searchImage => {
    setSearchImage(searchImage);
    setImages([]);
    setPage(1);
  };

  const loadMoreButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = image => {
    setLargeImage(image);
    setShowModal(showModal => !showModal);
  };

  useEffect(() => {
    if (!searchImage) {
      return;
    }
    setIsLoading(true);
    setIsVisible(true);
    fetchImages(searchImage, page)
      .then(({ hits, totalHits }) => {
        if (totalHits < 12) {
          setIsVisible(false);
        }
        if (totalHits === 0) {
          toast.error('Нема фото!');
        }
        setImages(prevImagesSet => [...prevImagesSet, ...hits]);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [page, searchImage]);

  return (
    <div>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      <ImageGallery
        images={images}
        toggleModal={toggleModal}
        onClickLoadMore={loadMoreButton}
        isLoading={isLoading}
      />
      {isVisible && <Button onClick={loadMoreButton} />}
      {showModal && (
        <Modal image={largeImage} onClose={toggleModal} alt={searchImage} />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;

// import Searchbar from 'components/Searchbar/Searchbar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Component } from 'react';
// import { toast } from 'react-toastify';

// import ImageGallery from 'components/ImageGallery/ImageGallery';
// import { fetchImages } from 'api/api';
// import Button from 'components/Button/Button';
// import Modal from 'components/Modal/Modal';

// export class App extends Component {
//   state = {
//     images: [],
//     page: 1,
//     searchImage: '',
//     largeImage: '',
//     isLoading: false,
//     showModal: false,
//     isVisible: false,
//   };
//   handleSearchFormSubmit = searchImage => {
//     this.setState({ searchImage });
//     this.setState({
//       images: [],
//       page: 1,
//     });
//   };

//   loadMoreButton = () => {
//     this.setState({
//       page: this.state.page + 1,
//       isLoading: true,
//     });
//   };

//   toggleModal = image => {
//     this.setState(({ showModal }) => ({
//       largeImage: image,
//       showModal: !showModal,
//     }));
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevImage = prevState.searchImage;
//     const currentImage = this.state.searchImage;
//     if (currentImage !== prevImage || this.state.page !== prevState.page) {
//       this.setState({ isLoading: true });
//       const images = await fetchImages(currentImage, this.state.page);
//       if (images.totalHits < 12) {
//         this.setState({ isVisible: false });
//       } else {
//         this.setState({ isVisible: true });
//       }
//       if (images.hits.length === 0) {
//         toast.error('Нема фото!');
//       }
//       this.setState(prev => ({
//         images: [...prev.images, ...images.hits],
//       }));
//       this.setState({ isLoading: false });
//     }
//   }

//   render() {
//     const { showModal, images, largeImage, searchImage, isLoading, isVisible } =
//       this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.handleSearchFormSubmit} />
//         <ImageGallery
//           images={images}
//           toggleModal={this.toggleModal}
//           onClickLoadMore={this.loadMoreButton}
//           isLoading={isLoading}
//         />
//         {isVisible && <Button onClick={this.loadMoreButton} />}
//         {showModal && (
//           <Modal
//             image={largeImage}
//             onClose={this.toggleModal}
//             alt={searchImage}
//           />
//         )}
//         <ToastContainer autoClose={3000} />
//       </div>
//     );
//   }
// }
