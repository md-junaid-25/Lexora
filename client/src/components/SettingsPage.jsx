import React, { useState, useEffect } from 'react';

const SettingsPage = ({ 
  user, setUser, onLogout, wordCount, 
  theme, setTheme, 
  fontSize, setFontSize,
  sortBy, setSortBy,
  highlightDifficult, setHighlightDifficult 
}) => {

  // Local state for the form inputs (so we don't save until clicked)
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    bio: localStorage.getItem('lexora_bio') || ''
  });

  // Sync local state if props change
  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      bio: localStorage.getItem('lexora_bio') || ''
    });
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    // Save to global state
    setUser({ ...user, name: formData.name, email: formData.email });
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    setUser(updatedUser); 
    // Also update in local storage
    localStorage.setItem('lexora_user', JSON.stringify(updatedUser));
    
    // Save to local storage
    localStorage.setItem('lexora_username', formData.name);
    localStorage.setItem('lexora_bio', formData.bio);
    
    alert("Profile updated successfully!");
  };

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  const handleExportData = () => {
  const dataStr = JSON.stringify(localStorage.getItem('lexora_words'));
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'lexora_backup.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

const handleImportData = (event) => {
  const fileReader = new FileReader();
  fileReader.readAsText(event.target.files[0], "UTF-8");
  fileReader.onload = e => {
    try {
      const parsedData = JSON.parse(JSON.parse(e.target.result)); // Parsing twice because of localstorage string structure
      if (Array.isArray(parsedData)) {
        // You might need to pass setWords from App.jsx to SettingsPage via props
        // For now, we update localStorage and reload
        localStorage.setItem('lexora_words', JSON.stringify(parsedData));
        alert("Data imported successfully! Reloading...");
        window.location.reload(); 
      }
    } catch (error) {
      alert("Invalid backup file.");
    }
  };
};

const handleResetData = () => {
  if (window.confirm("Are you sure? This will delete ALL your collected words permanently.")) {
    localStorage.removeItem('lexora_words');
    window.location.reload();
  }
};

  return (
    <div id="settingsPage" className="page fade-in">
      <h2 className="page-title">Settings</h2>

      <div id='profile-section'>
      
        {/* --- New Profile Section --- */}
        <div className="settings-section profile-container">
          <h3 className="section-title">Edit Profile</h3>
          
          <div className="profile-layout">
            {/* Left Column: Picture */}
            <div className="profile-left">
              <div className="profile-pic large">
                {user.avatar ? (
                    <img src={user.avatar} alt="Profile" />
                ) : (
                    <span id="profileInitials">{getInitials(user.name)}</span>
                )}
                
                <div className="profile-pic-edit">
                  <input type="file" id="profile-pic" accept="image/*" onChange={handleImageChange} />
                  <i className="fas fa-camera"></i>
                </div>
              </div>
              <div className="profile-stats-badge">
                  <i className="fas fa-layer-group"></i>
                  <span>{wordCount} Words Collected</span>
              </div>
            </div>

            {/* Right Column: Form Inputs */}
            <div className="profile-right">
              <div className="input-row">
                  <div className="input-group">
                      <label>Full Name</label>
                      <input 
                          type="text" 
                          name="name"
                          value={formData.name} 
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                      />
                  </div>
              </div>

              <div className="input-row">
                  <div className="input-group">
                      <label>Email</label>
                      <input 
                          type="email" 
                          name="email"
                          value={formData.email} 
                          onChange={handleInputChange}
                          placeholder="name@example.com"
                      />
                  </div>
              </div>

              <div className="input-row">
                  <div className="input-group">
                      <label>Learning Goal / Bio</label>
                      <textarea 
                          name="bio"
                          value={formData.bio} 
                          onChange={handleInputChange}
                          placeholder="e.g. Preparing for exams, Improving vocabulary..."
                          rows="3"
                      ></textarea>
                  </div>
              </div>

              <button className="btn btn-primary save-btn" onClick={saveProfile}>
                  Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>        

      <div id='section-block'>      
        {/* --- Existing Appearance Settings --- */}
        <div id='appearance-section' className="settings-section">
          <h3 className="section-title"><i className="fas fa-paint-brush"></i> Appearance</h3>
          
          <div className="setting-item">
            <span className="setting-label">Dark Mode</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={theme === 'dark'} 
                onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
              />
              <span className="slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <span className="setting-label">Font Size</span>
            <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        {/* --- Existing Organization Settings --- */}
        <div id='organise-section' className="settings-section">
          <h3 className="section-title"><i className="fas fa-sort"></i> Word Organization</h3>
          
          <div className="setting-item">
            <span className="setting-label">Sort By</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="alphabetical">Alphabetical</option>
              <option value="recent">Recently Added</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>
          
          <div className="setting-item">
            <span className="setting-label">Highlight Word Difficulty</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={highlightDifficult}
                onChange={(e) => setHighlightDifficult(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>  
      <div className="settings-section">
        <h3 className="section-title"><i className="fas fa-database"></i> Data Management</h3>
        
        <div className="setting-item">
            <span className="setting-label">Export Data</span>
            <button className="btn btn-secondary" onClick={handleExportData}>
                <i className="fas fa-download"></i> Download Backup
            </button>
        </div>

        <div className="setting-item">
            <span className="setting-label">Import Data</span>
            <label className="btn btn-secondary" style={{cursor: 'pointer'}}>
                <i className="fas fa-upload"></i> Upload Backup
                <input type="file" onChange={handleImportData} style={{display: 'none'}} accept=".json"/>
            </label>
        </div>
      </div>

      <div className="settings-section" style={{borderColor: 'var(--danger-color)'}}>
        <h3 className="section-title" style={{color: 'var(--danger-color)'}}>
          <i className="fas fa-exclamation-triangle"></i> Danger Zone</h3>
          
        <div className="setting-item">
          <span className="setting-label">Reset Collection</span>
            <button className="btn btn-danger" onClick={handleResetData}>Delete All Words</button>
        </div>
      </div>

      <div className="settings-section" style={{marginTop: '2rem'}}>
             <button className="btn btn-danger" style={{width: '100%'}} onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
             </button>
        </div>
   </div>
  );
};

export default SettingsPage;