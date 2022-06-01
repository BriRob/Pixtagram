import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./modals.css";

const CreatePost = ({hideModal}) => {
  const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(boolean);

  //   const openModal = () => {
  //     if (showModal) return;
  //     setShowModal(true);
  //   };

  //   useEffect(() => {
  //     if (!showModal) return;

  const closeModal = () => {
    // setShowModal(false);
    hideModal()
  };

  //     document.addEventListener("click", closeModal);

  //     return () => document.removeEventListener("click", closeModal);
  //   }, [showModal]);

  return (
    <div>
      {/* {showModal && ( */}
        <div className="createPostModal">
          <div className="outer">
            <h1 onClick={closeModal}>X</h1>
          </div>
          <div className="inner">
            <h1>HELLOOOOOOOO</h1>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default CreatePost;
