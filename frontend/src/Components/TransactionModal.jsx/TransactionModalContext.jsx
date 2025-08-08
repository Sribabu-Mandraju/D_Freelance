import { createContext, useContext, useState } from 'react';
import TransactionModal from './TransactionModal';

const TransactionModalContext = createContext();

export const TransactionModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
    status: '', // 'pending', 'confirming', 'success', 'error'
  });

  const showModal = ({ message, status }) => {
    setModalState({ isOpen: true, message, status });
  };

  const hideModal = () => {
    setModalState({ isOpen: false, message: '', status: '' });
  };

  return (
    <TransactionModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <TransactionModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        status={modalState.status}
        onClose={hideModal}
      />
    </TransactionModalContext.Provider>
  );
};

export const useTransactionModal = () => {
  const context = useContext(TransactionModalContext);
  if (!context) {
    throw new Error('useTransactionModal must be used within a TransactionModalProvider');
  }
  return context;
};