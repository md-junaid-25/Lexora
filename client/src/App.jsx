import React, { useState, useEffect } from 'react';
import './App.css';
import api from './utils/api'; // Import our API helper

import Sidebar from './components/Sidebar';
import WordsPage from './components/WordsPage';
import SettingsPage from './components/SettingsPage';
import HomePage from './components/HomePage';
import ProgressPage from './components/ProgressPage';
import LoginPage from './components/LoginPage';   
import SignupPage from './components/SignupPage'; 
import WelcomePage from './components/WelcomePage'; 
import ConfirmationModal from './components/ConfirmationModal';

function App() {
  // --- Auth State ---
  const [token, setToken] = useState(localStorage.getItem('auth-token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('lexora_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [authView, setAuthView] = useState('welcome');

  // --- App State ---
  const [activePage, setActivePage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [words, setWords] = useState([]); // Now fetched from DB
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Settings State (Visual only, persisted in local storage for preference)
  const [theme, setTheme] = useState(localStorage.getItem('lexora_darkMode') === 'true' ? 'dark' : 'light');
  const [fontSize, setFontSize] = useState(localStorage.getItem('lexora_fontSize') || 'medium');
  const [sortBy, setSortBy] = useState(localStorage.getItem('lexora_sortBy') || 'recent');
  const [highlightDifficult, setHighlightDifficult] = useState(localStorage.getItem('lexora_highlightDifficult') === 'true');

  // --- 1. Check Login Status on Load ---
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (token) {
        fetchWords();
      }
    };
    checkLoggedIn();
  }, [token]);

  // --- 2. API Functions ---
  const fetchWords = async () => {
    try {
      const res = await api.get('/words');
      setWords(res.data);
    } catch (err) {
      console.error("Error fetching words", err);
      if (err.response && err.response.status === 401) handleLogout();
    }
  };

  const handleLogin = (userData, authToken) => {
    localStorage.setItem('auth-token', authToken);
    setToken(authToken);
    localStorage.setItem('lexora_user', JSON.stringify(userData));
    setUser(userData);
    fetchWords(); // Load data immediately
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setToken(null);
    setUser(null);
    setWords([]);
  };

  // --- 3. Word Actions (Connected to DB) ---
  const addWord = async (newWord) => {
    try {
      const res = await api.post('/words', newWord);
      setWords([...words, res.data]); // Update UI with response from DB
    } catch (err) {
      alert("Error adding word");
    }
  };

  const editWord = async (updatedWord) => {
    try{
    const res = await api.put(`/words/${updatedWord._id}`, updatedWord);
    // Note: You need to implement PUT /api/words/:id in backend for this to work fully
    // For now, we update UI locally
    setWords(words.map(w => w._id === updatedWord._id ? updatedWord : w));
    }
    catch(err){
      console.error("Error updating word:", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  const deleteWord = async (id) => {
    try {
      await api.delete(`/words/${id}`);
      setWords(words.filter(w => w._id !== id));
    } catch (err) {
      alert("Error deleting word");
    }
  };

  // --- Theme Effects (Same as before) ---
  useEffect(() => {
    if (theme === 'dark') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
    localStorage.setItem('lexora_darkMode', theme === 'dark');
  }, [theme]);
  
  useEffect(() => {
    document.body.style.fontSize = { small: '14px', medium: '16px', large: '18px' }[fontSize];
  }, [fontSize]);

  
  // If not logged in, show Auth Screens
  if (!token) {
    if (authView === 'welcome') {
      return (
        <WelcomePage 
          onGetStarted={() => setAuthView('signup')} 
          onLogin={() => setAuthView('login')} 
        />
      );
    }
    
    if (authView === 'login') {
      return (
        <LoginPage 
            onLogin={handleLogin} 
            onSwitchToSignup={() => setAuthView('signup')} 
            // Optional: Add a back button to welcome page inside Login if you want
        />
      );
    }

    if (authView === 'signup') {
      return (
        <SignupPage 
            onLogin={handleLogin} 
            onSwitchToLogin={() => setAuthView('login')} 
        />
      );
    }
  }

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const performLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('lexora_user');
    setToken(null);
    setUser(null);
    setWords([]);
    setIsLogoutModalOpen(false); // Close modal
    setAuthView('welcome'); // Reset to welcome screen
  };

  // IF LOGGED IN (Token Exists)
  return (
    <div className="app-container">
      {/* <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        activePage={activePage} 
        onNavigate={(page) => { setActivePage(page); setIsSidebarOpen(false); }} 
        onLogout={handleLogoutClick}
      />

      <main>
        {activePage === 'home' && (
           <HomePage 
             existingWords={words} 
             onAddWord={addWord} 
             userName={user?.name} 
           />
        )}

        {activePage === 'words' && (
          <WordsPage 
            words={words} 
            sortBy={sortBy}
            highlightDifficult={highlightDifficult}
            onAddWord={addWord}
            onEditWord={editWord}
            onDeleteWord={deleteWord}
          />
        )}

        {activePage === 'progress' && <ProgressPage wordCount={words.length} />}

        {activePage === 'settings' && (
          <SettingsPage 
            user={user || { name: 'User', email: '...', avatar: null }} // Fallback
            setUser={setUser}
            onLogout={handleLogoutClick}
            wordCount={words.length}
            theme={theme} setTheme={setTheme}
            fontSize={fontSize} setFontSize={setFontSize}
            sortBy={sortBy} setSortBy={setSortBy}
            highlightDifficult={highlightDifficult} setHighlightDifficult={setHighlightDifficult}
          />
        )}
      </main>
      <ConfirmationModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={performLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out? You will need to sign in again to access your collection."
      />
    </div>
  );
}

export default App;