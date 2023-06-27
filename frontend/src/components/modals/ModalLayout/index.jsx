import { useRef, useId } from "react";
import "./ModalLayout.scss";
import classNames from "classnames";

export default function ModalLayout({
  isOpen,
  toggleModal,
  staticBackDrop,
  children,
  dialogClassName,
}) {
  const modalID = useId();
  const selectedModal = useRef();
  function modalSelf(e) {
    if (!staticBackDrop && e.target === selectedModal.current) {
      //or document.getElementById(modalID)
      toggleModal();
    }
  }
  return (
    <div
      className={classNames(
        "modal-layout",
        "modal-layout--show",
        isOpen && "modal-layout--show"
      )}
      onClick={modalSelf}
      ref={selectedModal}
      id={modalID}
    >
      <div className={classNames("modal-layout__dialog", dialogClassName)}>
        {children}
      </div>
    </div>
  );
}
