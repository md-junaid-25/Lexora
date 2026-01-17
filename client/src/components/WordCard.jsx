import React, { useState } from 'react';

const WordCard = ({ word, highlight, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Removed onClick from the main div
    <div className={`word-card ${word.difficulty} ${highlight ? 'highlight' : ''}`}>
      
      <div className="word-card-header">
        <div className="word-title">{word.word}</div>
        
        {/* Menu Section */}
        <div className="word-actions">
          <button 
            className="options-btn" 
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
          
          {isMenuOpen && (
            <div className="options-menu open">
              <div className="option-item edit" onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); onEdit(); }}>
                <i className="fas fa-edit"></i>
                <span>Edit</span>
              </div>
              <div className="option-item delete" onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); onDelete(); }}>
                <i className="fas fa-trash"></i>
                <span>Delete</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="word-details open">
        <p>{word.meaning}</p>
        <span className={`difficulty ${word.difficulty}`}>
          {word.difficulty.charAt(0).toUpperCase() + word.difficulty.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default WordCard;