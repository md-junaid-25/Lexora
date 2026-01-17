import React, { useState, useEffect } from 'react';

const WordModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    difficulty: 'medium'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        word: initialData.word,
        meaning: initialData.meaning,
        difficulty: initialData.difficulty
      });
    } else {
      setFormData({ word: '', meaning: '', difficulty: 'medium' });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{initialData ? 'Edit Word' : 'Add New Word'}</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Word</label>
            <input 
              type="text" 
              required 
              value={formData.word}
              onChange={(e) => setFormData({...formData, word: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Meaning</label>
            <textarea 
              required 
              value={formData.meaning}
              onChange={(e) => setFormData({...formData, meaning: e.target.value})}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Difficulty</label>
            <select 
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Save Changes' : 'Add Word'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WordModal;