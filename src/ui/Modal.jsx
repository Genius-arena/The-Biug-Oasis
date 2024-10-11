import styled from "styled-components";
import PropTypes from "prop-types";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import { cloneElement, createContext, useContext, useState } from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;
  const goat = "love";

  return (
    // Make sure to always use double curly brace when assigning values into the context provider element.
    <ModalContext.Provider value={{ openName, close, open, goat, setOpenName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // const { open, openName, close, goat, setOpenName } = useContext(ModalContext);
  // console.log("boogie", openName, close);
  // console.log(open);
  // console.log(goat);
  // console.log(setOpenName);

  // console.log(useContext(ModalContext).goat);
  // console.log(useContext(ModalContext));

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  // Use useOutsideClick custom hook
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

Modal.propTypes = {
  children: PropTypes.array,
};

Open.propTypes = {
  children: PropTypes.object,
  opens: PropTypes.string,
};

Window.propTypes = {
  children: PropTypes.object,
  name: PropTypes.string,
};

export default Modal;
