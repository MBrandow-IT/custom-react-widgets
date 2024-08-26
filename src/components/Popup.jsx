import React, { useEffect } from 'react';
import { FaXmark } from "react-icons/fa6";

const Popup = ({ open = undefined, setOpen, children }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [setOpen]);

  const handleOutsideClick = (e) => {
    const popupContainersArr = Array.from(document.getElementsByClassName('popup-container'));

    if (popupContainersArr.find(elem => elem === e.target)) setOpen(false);
  }


  return open !== undefined && <div className={`${open === true ? "open" : open === false ? "close" : ""} popup-container fixed inset-0 bg-smoky grid place-items-center z-[999]`} onClick={handleOutsideClick}>
    <div className="popup box-content p-8 px-2 sm:px-8 bg-primary text-primary-foreground max-w-[95vw] w-[500px] rounded-sm shadow-sm relative overflow-y-auto custom-scroller">
      <button className="fixed z-50 top-8 right-2 sm:right-8 m-2 text-2xl leading-none" id="close-btn" onClick={() => setOpen(false)}><FaXmark /></button>
      {children}
    </div>
  </div>
}

export default Popup;