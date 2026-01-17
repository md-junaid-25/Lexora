import React, { useState, useEffect } from 'react';
import { getRandomWords } from '../utils/wordBank';

const HomePage = ({ existingWords, onAddWord, userName }) => {
  const [dailySuggestions, setDailySuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDefinitions = async () => {
      setLoading(true);
      const randomWords = getRandomWords(8); // Fetch 6 words for the grid
      const wordDataPromises = randomWords.map(async (word) => {
        try {
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
          const data = await response.json();
          
          if (Array.isArray(data)) {
            return {
              word: data[0].word,
              meaning: data[0].meanings[0]?.definitions[0]?.definition || "No definition found.",
              difficulty: 'medium', // Default difficulty
              audio: data[0].phonetics.find(p => p.audio)?.audio || null
            };
          }
          return null;
        } catch (error) {
          console.error("Error fetching word:", word);
          return null;
        }
      });

      const results = await Promise.all(wordDataPromises);
      setDailySuggestions(results.filter(w => w !== null));
      setLoading(false);
    };

    fetchDefinitions();
  }, []);

  // Check if word is already in user's collection
  const isWordSaved = (wordText) => {
    return existingWords.some(w => w.word.toLowerCase() === wordText.toLowerCase());
  };

  return (
    <div id="homePage" className="page fade-in">
      <div className="home-header">
        <div className="greeting-section">
        <h2 style={{fontSize: '2rem'}}>Hey, {userName ? userName.split(' ')[0] : 'Scholar'}! 👋</h2> 
        <p>Ready to expand your vocabulary today?</p>     
        </div>
        <h2><i className="fas fa-lightbulb" style={{color: 'var(--warning-color)'}}></i> Discover New Words</h2>
        <p>Expand your vocabulary with today's picks.</p>
      </div>

      {loading ? (
        <div className="loading-state">
           <i className="fas fa-spinner fa-spin"></i> Loading words...
        </div>
      ) : (
        <div id="wordsContainer"> {/* Reusing grid layout */}
          {dailySuggestions.map((item, index) => {
            const saved = isWordSaved(item.word);
            return (
              <div key={index} className="word-card suggestion-card">
                <div className="word-card-header">
                  <div className="word-title">
                    {item.word.charAt(0).toUpperCase() + item.word.slice(1)}
                  </div>
                  {item.audio && (
                    <button className="audio-btn" onClick={() => new Audio(item.audio).play()}>
                        <i className="fas fa-volume-up"></i>
                    </button>
                  )}
                </div>
                
                <div className="word-details open">
                  <p>{item.meaning}</p>
                  
                  <button 
                    className={`btn ${saved ? 'btn-secondary' : 'btn-primary'} add-suggest-btn`}
                    disabled={saved}
                    onClick={() => onAddWord({
                        word: item.word,
                        meaning: item.meaning,
                        difficulty: 'medium'
                    })}
                  >
                    {saved ? <><i className="fas fa-check"></i> Saved</> : <><i className="fas fa-plus"></i> Add to Collection</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;