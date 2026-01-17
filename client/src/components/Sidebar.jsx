import React from 'react';
import Header from './Header';

const Sidebar = ({ isOpen, activePage, onNavigate, onLogout }) => {
  return (<>
    <Header />
    <nav className={`side-nav ${isOpen ? 'open' : ''}`} id="sideNav">
      <h2 id="men"></h2>
      
      <div 
        className={`nav-item ${activePage === 'home' ? 'active' : ''}`} 
        onClick={() => onNavigate('home')}
      >
        <i className="fas fa-home"></i>
        <span>Home</span>
      </div>

      <div 
        className={`nav-item ${activePage === 'words' ? 'active' : ''}`} 
        onClick={() => onNavigate('words')}
      >
        <i className="fas fa-book"></i>
        <span>My Words</span>
      </div>

      <div 
        className={`nav-item ${activePage === 'progress' ? 'active' : ''}`} 
        onClick={() => onNavigate('progress')}
      >
        <i className="fas fa-chart-bar"></i>
        <span>Progress</span>
      </div>

      <div 
        className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
        onClick={() => onNavigate('settings')}
      >
        <i className="fas fa-cog"></i>
        <span>Settings</span>
      </div>
      
      <div id='log-out' className="nav-item" onClick={onLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </div>
    </nav>
    </>
  );
};

export default Sidebar;