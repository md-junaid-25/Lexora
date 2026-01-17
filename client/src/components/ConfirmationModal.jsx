import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="confirmation-dialog">
            <p className="confirmation-message" style={{marginBottom: '1.5rem', fontSize: '1.05rem'}}>
                {message}
            </p>
            <div className="modal-actions">
                <button className="btn btn-secondary" onClick={onClose}>
                    Cancel
                </button>
                <button className="btn btn-danger" onClick={onConfirm}>
                    Confirm Logout
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;