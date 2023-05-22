import React, { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  boxClass?: string;
}

export default function Modal({
  children,
  isOpen,
  toggle,
  boxClass = "",
}: ModalType) {
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={toggle}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative top-20 mx-auto border w-96 shadow-lg rounded-md ${boxClass}`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
