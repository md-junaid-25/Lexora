import React from 'react';

const WelcomePage = ({ onGetStarted, onLogin }) => {
  return (
    <div className="welcome-container fade-in">
      {/* Navbar */}
      <nav className="welcome-nav">
        <div className="welcome-logo">
          <div className="logo-image"></div>
            <h1>Lexora</h1>
        </div>
        <button className="lg-btn" onClick={onLogin}>
            Login
        </button>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Master Your Vocabulary,<br />One Word at a Time.</h1>
          <p>
            Build your personal dictionary, track your progress, and discover new words 
            every day. The smartest way to improve your English.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary hero-btn" onClick={onGetStarted}>
                Get Started — It's Free
            </button>
            <button className="btn btn-outline hero-btn" onClick={onLogin}>
                I have an account
            </button>
          </div>
        </div>
        <div className="hero-image">
            {/* Decorative Icon/Graphic */}
            <i className="fas fa-book-reader" style={{fontSize: '15rem', color: 'rgba(255,255,255,0.1)'}}></i>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
            <div className="icon-bg"><i className="fas fa-search"></i></div>
            <h3>Discover</h3>
            <p>Get curated "Words of the Day" with definitions and audio to expand your lexicon daily.</p>
        </div>
        <div className="feature-card">
            <div className="icon-bg"><i className="fas fa-layer-group"></i></div>
            <h3>Collect</h3>
            <p>Save words you encounter in books or articles. Organize them by difficulty and keep them forever.</p>
        </div>
        <div className="feature-card">
            <div className="icon-bg"><i className="fas fa-chart-line"></i></div>
            <h3>Track</h3>
            <p>Visualize your learning progress and see your collection grow over time.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="welcome-footer">
        <p>&copy; {new Date().getFullYear()} Lexora. Built for learners.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;