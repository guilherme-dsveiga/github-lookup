import { ReactNode, useEffect, useRef } from "react";

type ModalProps = {
  show: boolean;
  toggle: Function;
  children: ReactNode;
};

function Modal({ show, toggle, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggle();
      }
    };

    const body = document.body;
    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
      body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show, toggle]);

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative max-w-5xl w-full bg-stone-900 shadow-md lg:rounded-lg  p-4 "
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
