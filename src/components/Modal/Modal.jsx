import React from 'react';
import { useEffect } from 'react';
import { Overlay, OverlayModal, ModalImage } from './Modal.styled';

const Modal = ({ image, onClose, alt }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <OverlayModal>
        <ModalImage src={image} alt={alt} />
      </OverlayModal>
    </Overlay>
  );
};
export default Modal;

// export default class Modal extends Component {
//     componentDidMount() {
//       window.addEventListener('keydown', this.handleKeyDown);
//     }

//     componentWillUnmount() {
//       window.removeEventListener('keydown', this.handleKeyDown);
//     }

//     handleKeyDown = e => {
//       if (e.code === 'Escape') {

//         this.props.onClose();
//       }
//     };

//     handleBackdropClick = event => {

//       if (event.currentTarget === event.target) {
//         this.props.onClose();
//       }
//     };

//     render() {
//       return (
//         <Overlay onClick={this.handleBackdropClick}>
//           <OverlayModal>
//           <ModalImage src={this.props.image} alt={this.props.searchImage}/>
//           </OverlayModal>
//         </Overlay>
//       );
//     }
//   }
