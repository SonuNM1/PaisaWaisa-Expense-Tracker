import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">

        {/* Modal Content */}
      
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
      
          {/* Modal Header */}
      
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="group text-gray-500 dark:text-gray-300 rounded-lg text-xl w-8 h-8 flex justify-center items-center cursor-pointer border hover:bg-purple-400"
              onClick={onClose}
            >
              <span className="group-hover:text-white">✕</span>
            </button>
          </div>

          {/* Modal Body */}

          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
