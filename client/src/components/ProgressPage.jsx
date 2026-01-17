import React from 'react';

const ProgressPage = () => {
  return (
    <div id="progressPage" className="page fade-in">
      <div className="empty-state">
        <i className="fas fa-chart-line" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}></i>
        <h3>Statistics Coming Soon</h3>
        <p>Track your learning streak, total words, and mastery level here.</p>
      </div>
    </div>
  );
};

export default ProgressPage;
