import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const TransactionModal = ({ isOpen, message, status, onClose }) => {
  // Auto-close for success or error states after 3 seconds
  useEffect(() => {
    let timer;
    if (isOpen && (status === 'success' || status === 'error')) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, status, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900 rounded-lg p-6 w-80 max-w-sm shadow-2xl flex flex-col items-center relative border border-gray-700"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Close transaction modal"
            >
              <XCircle size={20} />
            </button>

            {/* Status Icon */}
            {status === 'pending' || status === 'confirming' ? (
              <Loader className="animate-spin text-blue-400 mb-4" size={40} />
            ) : status === 'success' ? (
              <CheckCircle className="text-green-400 mb-4" size={40} />
            ) : (
              <XCircle className="text-red-400 mb-4" size={40} />
            )}

            {/* Message */}
            <p className="text-center text-gray-100 font-medium text-base">
              {message}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;