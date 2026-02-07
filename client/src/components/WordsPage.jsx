import React, { useState, useMemo } from 'react';
import WordCard from './WordCard';
import WordModal from './WordModal';
import WordofDay from './WordofDay';

const WordsPage = ({ words, sortBy, highlightDifficult, onAddWord, onEditWord, onDeleteWord }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState(null); // If not null, modal is in edit mode

  // Sort and Filter Logic
  const processedWords = useMemo(() => {
    let result = [...words];

    // Filter
    if (searchTerm) {
      result = result.filter(w => w.word.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sort
    if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.word.localeCompare(b.word));
    } else if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'difficulty') {
      const difficultyOrder = { 'hard': 0, 'medium': 1, 'easy': 2 };
      result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    }

    return result;
  }, [words, searchTerm, sortBy]);

  const handleEditClick = (word) => {
    setEditingWord(word);
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setEditingWord(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingWord) {
      onEditWord({ ...editingWord, ...formData });
    } else {
      onAddWord(formData);
    }
    handleModalClose();
  };

  return (
    <div id="wordsPage" className="page fade-in">
      <div id='top-bar'>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search words..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      <button className="add-word-btn" onClick={() => {setIsAddModalOpen(true); setEditingWord(null);}}>
        <i className="fas fa-plus"></i>&nbsp;&nbsp;
        <span>Add Word</span>
      </button>
      </div>

      <div id="wordsContainer">
        {processedWords.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-book-open" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <h3>{searchTerm ? "No matches found" : "No words added yet"}</h3>
            <p>Start by adding your first word!</p>
          </div>
        ) : (
          processedWords.map(word => (
            <WordCard 
              key={word._id} 
              word={word} 
              highlight={highlightDifficult}
              onEdit={() => handleEditClick(word)}
              onDelete={() => onDeleteWord(word._id)}
            />
          ))
        )}
      </div>

      {isAddModalOpen && (
        <WordModal 
          isOpen={isAddModalOpen} 
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
          initialData={editingWord}
        />
      )}

      {/* <WordofDay words={words} /> */}
    </div>
  );
};

export default WordsPage;
